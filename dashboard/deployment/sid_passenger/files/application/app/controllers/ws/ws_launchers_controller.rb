class Ws::WsLaunchersController < ApplicationController

  def get
    launchers = LauncherButton.launchers.map { |l| l.to_h }

    render json: { items: launchers }

  rescue => error
    logger.error "action=getLaunchers user=#{@user} error=#{error}"
    render json: { message: error }, status: :internal_server_error
  end
end