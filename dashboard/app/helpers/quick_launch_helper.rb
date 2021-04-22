module QuickLaunchHelper
  def button_column_classes
    "col-xs-12 col-sm-6 col-md-3"
  end

  def quick_launch_max_sessions
    3
  end

  def show_more_sessions_link?(items)
    items > quick_launch_max_sessions
  end

  def sys_url(from_url)
    from_url ? from_url.gsub(root_path, '/pun/sys/dashboard/') : from_url
  end

  def number_of_sessions_text_id
    "number-sessions-text".html_safe
  end

  def view_interactive_sessions_link_container_id
    "view-interactive-sessions-container".html_safe
  end

  def number_of_sessions_text(items)
    "<span id=\"#{number_of_sessions_text_id}\">(#{items})</span>".html_safe
  end
end