class Ws::WsSessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    if params[:token] == nil || params[:token] == ""
      render json: { message: "missing token" }, status: :bad_request
      return
    end

    app = BatchConnect::App.from_token params[:token]
    if !app.valid?
      render json: { message: app.validation_reason }, status: :bad_request
      return
    end

    session_context = app.build_session_context
    render_format = app.clusters.first.job_config[:adapter] unless app.clusters.empty?
    #READ ATTRIBUTES FROM PAYLOAD
    session_context.attributes = params.permit(session_context.attributes.keys)

    cache_file = BatchConnect::Session.dataroot(app.token).tap { |p| p.mkpath unless p.exist? }.join("context.json")

    session = BatchConnect::Session.new
    if session.save(app: app, context: session_context, format: render_format)
      cache_file.write(session_context.to_json)  # save context to cache file
      render json: { id: session.id, job_id: session.job_id }
    else
      logger.error "Unable to create session"
      render json: { message: "Unable to create session", errors: session_context.errors }, status: :internal_server_error
    end

  rescue => error
    logger.error "action=createSession user=#{@user} error=#{error}"
    render json: { message: error }, status: :internal_server_error
  end

  def delete_session
    if !BatchConnect::Session.exist(params[:session_id])
      render json: { message: "Invalid sessionId: #{params[:session_id]}" }, status: :not_found
      return
    end

    session = BatchConnect::Session.find(params[:session_id])
    if session.destroy
      render json: {}, status: :no_content
    else
      render json: session.errors, status: :internal_server_error
    end

  rescue => error
    logger.error "action=deleteSession user=#{@user} error=#{error}"
    render json: { message: error }, status: :internal_server_error
  end
end
