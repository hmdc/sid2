class Ws::CreateSessionController < ApplicationController
  include BatchConnectConcern

  protect_from_forgery with: :null_session

  def create
    app = BatchConnect::App.from_token params[:token]
    session_context = app.build_session_context
    render_format = app.clusters.first.job_config[:adapter] unless app.clusters.empty?
    #READ ATTRIBUTES FROM PAYLOAD
    session_context.attributes = params.require(:batch_connect_session_context).permit(session_context.attributes.keys)

    cache_file = BatchConnect::Session.dataroot(app.token).tap { |p| p.mkpath unless p.exist? }.join("context.json")

    session = BatchConnect::Session.new
    if session.save(app: app, context: session_context, format: render_format)
      cache_file.write(session_context.to_json)  # save context to cache file
      render json: { "id": session.id, "job_id": session.job_id }
    else
      render json: session_context.errors, status: :unprocessable_entity
    end
  end
end
