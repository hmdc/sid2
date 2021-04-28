module QuickLaunchHelper
  def button_column_classes
    "col-xs-12 col-sm-6 col-md-3"
  end

  def quick_launch_max_sessions
    3
  end

  def show_more_sessions_link?(sessions)
    active_sessions = active_sessions sessions
    active_sessions.length > quick_launch_max_sessions
  end

  def has_active_sessions?(sessions)
    active_sessions = active_sessions sessions
    active_sessions.length > 0
  end

  def active_sessions(sessions)
    sessions.reject {|s| s.completed?}
  end

  def sys_url(from_url)
    from_url ? from_url.gsub(root_path, '/pun/sys/dashboard/') : from_url
  end

  def terminal_url
    #URL FOR THE SHELL APP FOR THE CLUSTER LOGIN NODE. SELECT THE FIRST ONE. OOD SUPPORTS MULTIPLE, ONE PER CLUSTER
    SysRouter.apps.select {|app| app.name == "shell"}.first&.links&.first&.url
  end
end