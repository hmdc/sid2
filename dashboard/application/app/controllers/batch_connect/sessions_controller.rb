class BatchConnect::SessionsController < ApplicationController
  include BatchConnectConcern

  # GET /batch_connect/sessions
  # GET /batch_connect/sessions.json
  def index
    @sessions = BatchConnect::Session.all
    redirect = get_redirect
    @sessions.each do |session|
      session.update_cache_completed!
      session.redirect = redirect
    end

    set_app_groups
    set_my_quotas
  end

  # GET /batch_connect/sessions/new
  def new
    @sessions = BatchConnect::Session.all
  end

  def show
    redirect = get_redirect || batch_connect_sessions_url
    redirect_to redirect, alert: "Unknown error, please try again. "
  end

  # DELETE /batch_connect/sessions/1
  # DELETE /batch_connect/sessions/1.json
  def destroy
    set_session

    redirect = get_redirect || batch_connect_sessions_url

    if @session.destroy
      respond_to do |format|
        format.html { redirect_to redirect, notice: t('dashboard.batch_connect_sessions_status_blurb_delete_success') }
        format.json { head :no_content }
      end
    else
      respond_to do |format|
        format.html { redirect_to redirect, alert: t('dashboard.batch_connect_sessions_status_blurb_delete_failure') }
        format.json { render json: @session.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session
      @session = BatchConnect::Session.find(params[:id])
    end

    # Set list of app lists for navigation
    def set_app_groups
      @sys_app_groups = bc_sys_app_groups
      @usr_app_groups = bc_usr_app_groups
      @dev_app_groups = bc_dev_app_groups
    end


  def get_redirect
    params[:r] ? params[:r] : nil
  end
end
