class QuickLaunchController < ApplicationController
  def index
    set_sessions
    set_quick_links

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

  def set_quick_links
    links_template_path = Rails.root.join("app", "views", "widgets", "config.yml")
    contents = links_template_path.read
    config = YAML.safe_load(contents).to_h.deep_symbolize_keys
    @quick_links = config[:quick_links] || []
  end
end
