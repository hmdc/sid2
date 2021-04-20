module QuickLaunchHelper
  def button_column_classes
    "col-xs-12 col-sm-6 col-md-3"
  end

  def quick_launch_max_sessions
    3
  end

  def sys_url(from_url)
    from_url ? from_url.gsub(root_path, '/pun/sys/dashboard/') : from_url
  end

  def number_of_sessions_text_id
    "number-sessions-text".html_safe
  end

  def number_of_sessions_text(items)
    "<span id=\"#{number_of_sessions_text_id}\">(#{items})</span>".html_safe
  end
end