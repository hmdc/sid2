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
      next if !app.launch_button
      metadata = { id: sys_app.name }
      metadata[:type] = "system"
      metadata[:path] = sys_app.path

      launch_button_config = app.launch_button.clone
      launch_button_config[:form][:token] = sys_app.token
      launch_button_config[:view][:logo] = sys_app.image_uri

      launcher = LauncherButton.new(metadata, launch_button_config)
      app_launchers[launcher.id] = launcher
    end

    app_launchers.values
  end

  def initialize(metadata, config)
    @metadata = metadata
    @form = config[:form]
    @view = config[:view]

    raise ArgumentError, "launch button config must defined a token field id=#{id} metadata=#{metadata}" unless @form[:token]
    raise ArgumentError, "launch button config must defined an id metadata=#{metadata}" unless @metadata[:id]

    @metadata[:id] = @metadata[:id].downcase
  end

  def id
    return @metadata[:id]
  end

  def cluster
    return @cluster if @cluster
    ood_app = BatchConnect::App.from_token @form[:token]
    @cluster = ood_app.clusters.first.id.to_s if ood_app.clusters.any?
  end

  def default_partition
    return @default_partition if @default_partition
    cluster_metadata = ::Configuration.cluster_metadata.select{|metadata| metadata.cluster_id == cluster}.first
    @default_partition = cluster_metadata.default_partition if cluster_metadata
  end

  def to_h
    hsh = {}
    hsh[:metadata] = @metadata.clone
    hsh[:form] = @form.clone
    hsh[:form][:cluster] = cluster
    hsh[:form][:bc_queue] = default_partition
    hsh[:view] = @view.clone
    return hsh
  end

  private
  def self.read_yaml(path:)
    contents = path.read
    YAML.safe_load(contents).to_h.deep_symbolize_keys
  end

end