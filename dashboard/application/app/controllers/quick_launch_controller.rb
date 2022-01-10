class QuickLaunchController < ApplicationController
  def index
    set_sessions
    set_page_configuration

    launcher_buttons_configuration = { maxSessions: helpers.quick_launch_max_sessions }

    @launchers = []

    LauncherButton.launchers.each do |launcher_config|
      next if !launcher_config.operational?

      launcher_id = launcher_config.id
      launcher = launcher_config.to_h
      @launchers.push launcher
      launcher_buttons_configuration[launcher_id] = launcher[:form]
    end

    @launcher_buttons_json = launcher_buttons_configuration.to_json
  end

  def sessions_js
    set_sessions

    render "batch_connect/sessions/index"
  end

  private

  def set_sessions
    @sessions = BatchConnect::Session.all
    @sessions.each do |session|
      session.update_cache_completed!
      session.redirect = root_url
    end

    @sessions = @sessions.reject { |s| s.completed? }
  end

  def set_page_configuration
    page_configuration_path = Rails.root.join("app", "views", "widgets", "config.yml")
    page_config_for_cluster = []
    if page_configuration_path.file? && page_configuration_path.readable?
      config = YAML.safe_load(page_configuration_path.read).to_h.deep_symbolize_keys
      system_cluster_ids = ::Configuration.cluster_metadata.map{|metadata| metadata.cluster_id}
      page_config_for_cluster = config[:clusters].select{|page_configuration| system_cluster_ids.include?(page_configuration[:cluster_id])}
    end
    # SELECT THE QUICK LINKS FOR THE CURRENT CLUSTERS AS A SINGLE ARRAY
    @quick_links = page_config_for_cluster.flat_map{|data| data[:links]} || []
    # SELECT THE WELCOME MESSAGE FOR THE CURRENT CLUSTER
    @welcome_message = page_config_for_cluster.map{|data| data[:welcome_message]}.first || "welcome_message"
  end
end
