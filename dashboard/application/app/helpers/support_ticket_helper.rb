module SupportTicketHelper

  def support_ticket_add_error_class(field)
    "has-error" if support_ticket_has_error?(field)
  end

  def support_ticket_add_error_message(field)
    html = %Q(<div class="help-block" id="#{field}_error">The #{field} #{@support_ticket.errors[field][0]}</div>)
    html.html_safe if support_ticket_has_error?(field)
  end

  def support_ticket_has_error?(field)
    !@support_ticket.errors[field].blank?
  end

  #AVOID SESSION DROPDOWN GETTING OUT OF HAND
  # ONLY DISPLAY THE N MOST RECENT SESSIONS
  def support_ticket_max_sessions
    20
  end
end