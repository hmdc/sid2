class QuickLaunchController < ApplicationController
  def index
    set_sessions

    launcher_buttons_configuration = { maxSessions: helpers.quick_launch_max_sessions }

    @launchers = []

    LauncherButton.launchers.each do |launcher_config|
      next if !launcher_config.cluster

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
end
