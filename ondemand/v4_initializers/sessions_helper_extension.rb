# SessionsHelper extension to support TurboVNC and KVM
Rails.application.config.after_initialize do
  Rails.logger.info "Executing SessionsHelper extension ..."
  module BatchConnect::SessionsHelper

    def render_connection(session)
      if session.running?
        if session.view
          views = { partial: "custom", locals: { view: session.view, connect: session.connect } }
        else
          if session.vnc?
            views = []
            views << { title: "noVNC Connection",    partial: "novnc",      locals: { connect: session.connect, app_title: session.title } }
            views << { title: "Native Instructions", partial: "native_vnc", locals: { connect: session.connect } } if ENV["ENABLE_NATIVE_VNC"]
          elsif session.script_type == "turbovnc"
            views = []
            views << { title: "noVNC Connection",    partial: "novnc",      locals: { connect: session.connect, app_title: session.title } }
            views << { title: "VNC Desktop Client",  partial: "turbovnc", locals: { connect: session.connect } } if ENV["ENABLE_NATIVE_VNC"]
          elsif session.script_type == "kvm"
            views = []
            views << { title: "noVNC Connection",    partial: "novnckvm",      locals: { connect: session.connect, app_title: session.title } }
            views << { title: "VNC Desktop Client",  partial: "kvm", locals: { connect: session.connect } } if ENV["ENABLE_NATIVE_VNC"]
          else
            views = { partial: "missing_connection" }
          end
        end
      elsif session.starting?
        views = { partial: "starting" }
      elsif session.queued?
        views = { partial: "queued" }
      elsif session.completed?
        views = { partial: "completed", locals: { session: session } }
      else
        views = { partial: "bad" }
      end

      connection_tabs(session.id, views)
    end
  end

  Rails.logger.info "Executing SessionsHelper extension completed"
end