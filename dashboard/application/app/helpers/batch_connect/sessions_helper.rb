module BatchConnect::SessionsHelper
  def session_panel(session)
    content_tag(:div, id: session.id, class: "panel panel-#{status_context(session)} session-panel", data: { hash: session.to_hash }) do
      concat(
        content_tag(:div, class: "panel-heading") do
          content_tag(:h1, class: "panel-title") do
            concat link_to(content_tag(:strong, session.title), new_batch_connect_session_context_path(token: session.token))
            concat " (#{session.job_id})"
            concat(
              content_tag(:div, class: "pull-right") do
                num_nodes = session.info.allocated_nodes.size
                num_cores = session.info.procs.to_i

                # Generate nice status display
                status = []
                if session.starting? || session.running?
                  status << content_tag(:span, pluralize(num_nodes, "node"), class: "badge") unless num_nodes.zero?
                  status << content_tag(:span, pluralize(num_cores, "core"), class: "badge") unless num_cores.zero?
                end
                status << "#{status session}"
                if session.queued?
                  status << content_tag(:span, "Expected Start: #{session.info.native[:start_time]}", class: "badge")
                end
                status.join(" | ").html_safe
              end
            )
            concat content_tag(:div, "", class: "clearfix")
          end
        end
      )
      concat(
        content_tag(:div, class: "panel-body") do
          yield
        end
      )
    end
  end

  def session_view(session)
    capture do
      concat(
        content_tag(:div) do
          concat content_tag(:div, delete_terminate_buttons(session))
          concat host(session)
          concat created(session)
          concat requested_parameters(session)
          concat exit_status(session)
          concat queued_reason(session)
          concat time(session)
          concat id(session)
          concat support(session)
          concat tag.hr                         if session.info_view
          safe_concat custom_info_view(session) if session.info_view
        end
      )
      concat content_tag(:div) { yield }
    end
  end

  def custom_info_view(session)
    content_tag(:div) do
      concat render partial: "batch_connect/sessions/connections/info", locals: { view: session.info_view, session: session }
    end
  end

  def created(session)
    content_tag(:p) do
      concat content_tag(:strong, t('dashboard.batch_connect_sessions_stats_created_at'))
      concat " "
      concat Time.at(session.created_at).localtime.strftime("%Y-%m-%d %H:%M:%S %Z")
    end
  end


  def requested_parameters(session)
    if session.completion_info
      memory = session.completion_info["memory"]
      cores = session.completion_info["cpu"]
      runtime = distance_of_time_in_words(session.completion_info["runtime"].to_i, 0, false, :only => [:minutes, :hours], :accumulate_on => :hours) if session.completion_info["runtime"].to_i != 0
    elsif session.info.native
      memory = session.info.native[:min_memory]
      cores = session.info.native[:min_cpus]
      runtime = distance_of_time_in_words(session.info.wallclock_limit, 0, false, :only => [:minutes, :hours], :accumulate_on => :hours)
    end

    content_tag(:p) do
      concat content_tag(:strong, "Basic Parameters:")
      concat " "
      concat "#{memory || "N/A"} Memory | #{cores ? pluralize(cores, "Core") : "N/A Core"} | #{runtime || "N/A"} Runtime"
    end
  end

  def exit_status(session)
    if session.completed? && session.completion_info
      content_tag(:p) do
        concat content_tag(:strong, "Exit Status:")
        concat " "
        concat "#{session.completion_info["state"] || "N/A"} | #{session.completion_info["reason"] || "N/A"} | #{session.completion_info["exit_code"] || "N/A"} Exit code"
      end
    else
      ""
    end
  end

  def queued_reason(session)
    if session.queued?
      content_tag(:p) do
        concat content_tag(:strong, "Queued Reason:")
        concat " #{session.info.native[:reason]}"
      end
    else
      ""
    end
  end

  def support(session)
    content_tag(:p) do
      concat content_tag(:strong, "Problems with this session?")
      concat " "
      concat(
        link_to(
          "Submit support ticket",
          support_path(session_id: session.id)
        )
      )
    end
  end

  def time(session)
    time_limit = session.info.wallclock_limit
    time_used  = session.info.wallclock_time

    content_tag(:p) do
      if session.starting? || session.running?
        if time_limit && time_used
          concat content_tag(:strong, t('dashboard.batch_connect_sessions_stats_time_remaining'))
          concat " "
          concat distance_of_time_in_words(time_limit - time_used, 0, false, :only => [:minutes, :hours], :accumulate_on => :hours)
        elsif time_used
          concat content_tag(:strong, t('dashboard.batch_connect_sessions_stats_time_used'))
          concat " "
          concat distance_of_time_in_words(time_used, 0, false, :only => [:minutes, :hours], :accumulate_on => :hours)
        end
      else  # not starting or running
        if time_limit
          concat content_tag(:strong, t('dashboard.batch_connect_sessions_stats_time_requested'))
          concat " "
          concat distance_of_time_in_words(time_limit, 0, false, :only => [:minutes, :hours], :accumulate_on => :hours)
        end
      end
    end
  end

  def host(session)
    if ::Configuration.ood_bc_ssh_to_compute_node
      content_tag(:p) do
        concat content_tag(:strong, t('dashboard.batch_connect_sessions_stats_host'))
        concat " "
        concat(
          session.connect.host ? link_to(
            session.connect.host, OodAppkit.shell.url(
              host: session.connect.host).to_s,
              target: "_blank",
              class: "btn btn-primary btn-sm fas fa-terminal"
            ) : t('dashboard.batch_connect_sessions_stats_undetermined_host')
        )
      end if session.running?
    else
      content_tag(:p) do
        concat content_tag(:strong, t('dashboard.batch_connect_sessions_stats_host'))
        concat " "
        concat session.connect.host || t('dashboard.batch_connect_sessions_stats_undetermined_host')
      end if session.running?
    end
  end

  def id(session)
    content_tag(:p) do
      concat content_tag(:strong, t('dashboard.batch_connect_sessions_stats_session_id'))
      concat " "
      concat(
        link_to(
          session.id,
          OodAppkit.files.url(path: session.staged_root).to_s,
          target: "_blank"
        )
      )
    end
  end

  def status(session)
    if session.starting?
      "Starting"
    elsif session.running?
      "Running"
    elsif session.queued?
      "Queued"
    elsif session.held?
      "Held"
    elsif session.suspended?
      "Suspended"
    elsif session.completed?
      "Completed"
    else
      "Undetermined"
    end
  end

  def status_context(session)
    if session.starting?
      "primary"
    elsif session.running?
      "success"
    elsif session.queued?
      "info"
    elsif session.completed?
      "default"
    elsif session.held? || session.suspended?
      "danger"
    else
      "warning"
    end
  end

  def delete_terminate_buttons(session)
    if session.completed?
      link_to(
        icon("fas", "trash-alt", t('dashboard.batch_connect_sessions_delete_title'), class: "fa-fw"),
        batch_connect_session_path(session, r: session.redirect),
        method: :delete,
        class: "btn btn-sid-delete pull-right btn-delete",
        title: t('dashboard.batch_connect_sessions_delete_hover'),
        data: { confirm: t('dashboard.batch_connect_sessions_delete_confirm'), cancel: 'Close', toggle: "tooltip", placement: "bottom"}
      )
    else
      link_to(
        icon("fas", "times-circle", t('dashboard.batch_connect_sessions_terminate_title'), class: "fa-fw"),
        batch_connect_session_path(session, r: session.redirect, delete: 'false'),
        method: :delete,
        class: "btn btn-sid-terminate pull-right btn-terminate",
        title: t('dashboard.batch_connect_sessions_terminate_hover'),
        data: { confirm: t('dashboard.batch_connect_sessions_terminate_confirm'), cancel: 'Close', toggle: "tooltip", placement: "bottom"}
      )
    end
  end

  def novnc_link(connect, view_only: false)
    version  = "1.1.0"
    password = view_only ? connect.spassword : connect.password
    resize   = view_only ? "downscale" : "remote"
    path = asset_path("noVNC-#{version}/vnc.html?autoconnect=true&password=#{password}&path=rnode/#{connect.host}/#{connect.websocket}/websockify&resize=#{resize}", skip_pipeline: true)
    sys_url(path)
  end

  def connection_tabs(id, tabs)
    tabs = Array.wrap(tabs)
    if tabs.any? && tabs.size == 1
      # hr + content
      capture do
        tab = tabs.first
        concat tag.hr
        concat(
          content_tag(:div, class: "ood-appkit markdown") do
            render partial: "batch_connect/sessions/connections/#{tab[:partial]}", locals: tab[:locals]
          end
        )
      end
    else
      # tabs
      content_tag(:div) do
        # menu
        concat(
          content_tag(:ul, class: "nav nav-tabs") do
            tabs.map { |t| t[:title] }.map.with_index do |title, idx|
              content_tag(:li, class: "#{"active" if idx.zero?}") do
                link_to title, "##{id}_#{idx}", data: { toggle: "tab" }
              end
            end.join("\n").html_safe
          end
        )
        # content
        concat(
          content_tag(:div, class: "tab-content") do
            tabs.map.with_index do |tab, idx|
              content_tag(:div, id: "#{id}_#{idx}", class: "tab-pane ood-appkit markdown #{"active" if idx == 0}") do
                render partial: "batch_connect/sessions/connections/#{tab[:partial]}", locals: tab[:locals]
              end
            end.join("\n").html_safe
          end
        )
      end
    end
  end
end
