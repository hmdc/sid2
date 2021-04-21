class Ws::GetSessionsController < ApplicationController

  def get_all
    @sessions = BatchConnect::Session.all
    @sessions.each(&:update_cache_completed!)

    response = @sessions.map do |session|
      create_session_data session
    end

    render json: { items: response }

  rescue => error
    logger.error "action=getSessions user=#{@user} error=#{error}"
    render json: { message: error }, status: :internal_server_error
  end

  def get_session
    if !BatchConnect::Session.exist(params[:session_id])
      render json: { message: "Not found sessionId: #{params[:session_id]}" }, status: :not_found
      return
    end

    session = BatchConnect::Session.find(params[:session_id])
    render json: create_session_data(session)
  end

  private
  def create_session_data(session)
    sessionDataUrl = OodAppkit.files.url(path: session.staged_root).to_s
    sessionShellUrl = OodAppkit.shell.url(host: session.connect.host).to_s if session.running? && session.connect.host
    connect = create_connect_data session

    {
      id: session.id,
      clusterId: session.cluster_id,
      jobId: session.job_id,
      createdAt: session.created_at,
      token: session.token,
      title: session.title,
      info: session.info.to_h,
      status: session.status.to_sym,
      type: session.script_type,
      connect: connect,
      wallClockTimeSeconds: session.info.wallclock_time,
      wallClockLimitSeconds: session.info.wallclock_limit,
      deletedInDays: session.days_till_old,
      sessionDataUrl: sessionDataUrl,
      sessionShellUrl: sessionShellUrl,
    }
  end

  def create_connect_data(session)
    connect_data = nil
    if session.running?
      connect_data = session.connect.to_h
      if session.view
        connect_data[:url] = parse_form_action(session)
      else
        connect_data[:url] = helpers.novnc_link(session.connect, view_only: false)
      end
    end

    connect_data
  end

  def parse_form_action(session)
    #RENDER VIEW HTML AS OOD AND GET THE ACTION URL FROM THE FORM
    view = OodAppkit.markdown.render(ERB.new(session.view, nil, "-").result(session.connect.instance_eval { binding }))
    view_html = Nokogiri::HTML(view)
    view_html.at("form")["action"]
  rescue => error
    logger.error "action=view_form_action user=#{@user} error=#{error}"
    ""
  end
end