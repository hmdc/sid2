class Ws::GetSessionsController < ApplicationController

  def get_all
    @sessions = BatchConnect::Session.all
    @sessions.each(&:update_cache_completed!)

    response = @sessions.map do |session|
      create_session_data session
    end

    render json: response

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
    time_limit = session.info.wallclock_limit
    time_used  = session.info.wallclock_time
    time_left = helpers.distance_of_time_in_words(time_limit - time_used, 0, false, :only => [:minutes, :hours], :accumulate_on => :hours) if time_limit
    sessionHost = OodAppkit.shell.url(host: session.connect.host).to_s if session.running? && session.connect.host

    #IMPORTANT DATA
    # connect.host
    # connect.port
    # info.job_owner => username
    # connect.password

    {
      id: session.id,
      title: session.title,
      token: session.token,
      info: session.info,
      status: session.status.to_sym,
      connect: session.running? ? session.connect.to_h : nil,
      session: session,
      time: session.info.wallclock_time.to_i / 60,     # only update every minute
      time_left: time_left,
      deleteIn: session.days_till_old,
      sessionIdUrl: OodAppkit.files.url(path: session.staged_root).to_s,
      sessionHost: sessionHost,
    }
  end
end