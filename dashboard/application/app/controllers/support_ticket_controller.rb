class SupportTicketController < ApplicationController

  def new
    @support_ticket = SupportTicket.new ({session_id: params[:session_id]})
    @sessions = BatchConnect::Session.all

    if @support_ticket.session_id
      if !BatchConnect::Session.exist(@support_ticket.session_id)
        flash.now[:alert] = "Session: #{@support_ticket.session_id} not found. Select a valid session from the dropdown."
      else
        @session = BatchConnect::Session.find(@support_ticket.session_id)
      end
    end
  end

  def create
    queue = params[:queue]
    create_support_ticket

    if !@support_ticket.valid?
      flash.now[:alert] = "Invalid Request. Please review the error messages below"
      setup_sessions
      render "new"
      return
    end
    if !@support_ticket.session_id.blank? && !BatchConnect::Session.exist(@support_ticket.session_id)
      flash.now[:alert] = "Invalid session: #{@support_ticket.session_id}. Please select one from the Session dropdown"
      setup_sessions
      render "new"
      return
    end

    rts = RequestTrackerService.new ::Configuration.request_tracker_config
    ticket_id = rts.create_ticket(@support_ticket)
    logger.info "action=createSupportTicket result=success user=#{@user} subject=#{@support_ticket.subject} ticket=#{ticket_id} queue=#{queue}"
    redirect_to root_url, :flash => { :notice => "Support ticket created - Ticket id: #{ticket_id}" }

    rescue => error
      logger.error "action=createSupportTicket user=#{@user} error=#{error}"
      flash.now[:alert] = "There was an error processing your request: #{error}"
      setup_sessions
      render "new"
  end

  private

  def create_support_ticket
    @support_ticket = SupportTicket.new params.require(:support_ticket).permit!
  end

  def setup_sessions
    @sessions = BatchConnect::Session.all
    if !@support_ticket.session_id.blank? && BatchConnect::Session.exist(@support_ticket.session_id)
      @session = BatchConnect::Session.find(@support_ticket.session_id)
    end
  end
end
