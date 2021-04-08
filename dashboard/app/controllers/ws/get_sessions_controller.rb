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
      render json: { message: "Invalid sessionId: #{params[:session_id]}" }, status: :not_found
      return
    end

    session = BatchConnect::Session.find(params[:session_id])
    render json: create_session_data(session)
  end

  private
  def create_session_data(session)
    sessionShellUrl = OodAppkit.shell.url(host: session.connect.host).to_s if session.running? && session.connect.host

    view = OodAppkit.markdown.render(ERB.new(session.view, nil, "-").result(session.connect.instance_eval { binding })).html_safe if session.running?

    {
      id: session.id,
      clusterId: session.cluster_id,
      jobId: session.job_id,
      createdAt: session.created_at,
      token: session.token,
      title: session.title,
      info: session.info,
      status: session.status.to_sym,
      connect: session.running? ? session.connect.to_h : nil,
      wallClockTimeSeconds: session.info.wallclock_time,
      wallClockLimitSeconds: session.info.wallclock_limit,
      deletedInDays: session.days_till_old,
      sessionDataUrl: OodAppkit.files.url(path: session.staged_root).to_s,
      sessionShellUrl: sessionShellUrl,
      appLaunchView: view,
    }
  end
end