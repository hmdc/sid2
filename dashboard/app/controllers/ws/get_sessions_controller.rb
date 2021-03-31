class Ws::GetSessionsController < ApplicationController
include BatchConnectConcern

  def index
    @sessions = BatchConnect::Session.all
    @sessions.each(&:update_cache_completed!)

    @cluster = OodAppkit.clusters['dev-cluster']
    @info = adapter.info(7)

    set_app_groups
    set_my_quotas

    Rails.logger.info "ADAY - #{ws_sessions_path}"

    response = @sessions.map do |session|
      time_limit = session.info.wallclock_limit
      time_used  = session.info.wallclock_time
      test = helpers.distance_of_time_in_words(time_limit - time_used, 0, false, :only => [:minutes, :hours], :accumulate_on => :hours) if time_limit
      sessionHost = OodAppkit.shell.url(host: session.connect.host).to_s if session.connect.host

      #IMPORTANT DATA
      # connect.host
      # connect.port
      # info.job_owner => username
      # connect.password

      {
        id: session.id,
        title: session.title,
        token: session.token,
        #info: session.info,
        status: session.status.to_sym,
        connect: session.running? ? session.connect.to_h : nil,
        session: session,
        time: session.info.wallclock_time.to_i / 60,     # only update every minute
        test: test,
        deleteIn: session.days_till_old,
        sessionIdUrl: OodAppkit.files.url(path: session.staged_root).to_s,
        sessionHost: sessionHost,
      }
    end

    render json: response
  end

private
  def adapter
    @cluster.job_allow? ? @cluster.job_adapter : raise(AdapterNotAllowed, "Session specifies 'dev-cluster' cluster id that you do not have access to.")
  end

  # Set list of app lists for navigation
  def set_app_groups
    @sys_app_groups = bc_sys_app_groups
    @usr_app_groups = bc_usr_app_groups
    @dev_app_groups = bc_dev_app_groups
  end
end