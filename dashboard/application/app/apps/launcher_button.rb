class LauncherButton

  def self.launchers
    app_launchers = {}

    #APP CONFIGURED LAUNCHERS
    launchers_path = Rails.root.join("config", "launchers")
    if launchers_path.directory? && launchers_path.readable?
      launchers_path.children.each do |launcher_file|
        file_id = launcher_file.basename(launcher_file.extname).to_s
        metadata = { id: file_id }
        metadata[:type] = "application"
        metadata[:path] = launcher_file.to_s

        config = read_yaml(path: launcher_file)

        launcher = LauncherButton.new(metadata, config)
        app_launchers[launcher.id] = launcher
      end
    end

    #SYSTEM CONFIGURED LAUNCHERS
    SysRouter.apps.each do |sys_app|
      app = BatchConnect::App.from_token sys_app.token
      next if !app.launcher_button
      metadata = { id: sys_app.name }
      metadata[:type] = "system"
      metadata[:path] = sys_app.path

      launch_button_config = app.launcher_button.clone
      launch_button_config[:form][:token] = sys_app.token
      launch_button_config[:view][:logo] = sys_app.image_uri

      launcher = LauncherButton.new(metadata, launch_button_config)
      app_launchers[launcher.id] = launcher
    end

    #ODER BY order field. ITEMS WITHOUT order field WILL GO LAST
    app_launchers.values.sort
  end

  def initialize(metadata, config)
    @metadata = metadata
    @form = config[:form]
    @view = config[:view]

    @metadata[:id] = config[:id] ? config[:id].downcase : @metadata[:id]&.downcase

    raise ArgumentError, "launch button config must defined an id metadata=#{metadata}" unless @metadata[:id]
    raise ArgumentError, "launch button config must defined a token field id=#{id} metadata=#{metadata}" unless @form[:token]

    set_cluster
    set_partition
    @metadata[:order] = config[:order]
    @metadata[:status] = config[:status] ? config[:status].downcase : "active"
  end

  def id
    return @metadata[:id]
  end

  def order
    return @metadata[:order]
  end

  def operational?
    return @metadata[:status] == "active" && @cluster != nil && @launcher_partition != nil
  end

  def to_h
    hsh = {}
    hsh[:metadata] = @metadata.clone
    hsh[:metadata][:operational] = operational?
    hsh[:form] = @form.clone
    hsh[:form][:cluster] = @cluster
    hsh[:form][:bc_queue] = @launcher_partition
    hsh[:view] = @view.clone
    return hsh
  end

  def <=> (other)
    return 0 if !order && !other.order
    return 1 if !order
    return -1 if !other.order
    order <=> other.order
  end

  private
  def self.read_yaml(path:)
    contents = path.read
    YAML.safe_load(contents).to_h.deep_symbolize_keys
  end

  def set_cluster
    ood_app = BatchConnect::App.from_token @form[:token]
    @cluster = ood_app.clusters.first.id.to_s if ood_app.clusters.any?
  end

  def set_partition
    cluster_metadata = ::Configuration.cluster_metadata.select{|metadata| metadata.cluster_id == @cluster}.first
    if !cluster_metadata
      return
    end

    if(@form[:bc_queue])
      user_groups = User.new.groups.map { |g| g.name}
      @launcher_partition = cluster_metadata.partitions(user_groups).include?(@form[:bc_queue]) ? @form[:bc_queue] : nil
    else
      @launcher_partition = cluster_metadata.default_partition
    end
  end

end