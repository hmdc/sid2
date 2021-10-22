class RequestTrackerService

  def initialize(config)
    @queue = config[:queue_name]
    @priority = config[:priority]

    if !@queue || !@priority
      raise ArgumentError, "queue_name and priority are required options for RT service"
    end
  end

  def create_ticket(support_ticket_request)
    session = BatchConnect::Session.find(support_ticket_request.session_id) if !support_ticket_request.session_id.blank?

    ticket_template_context = {
      session: session,
      description: support_ticket_request.description,
    }

    ticket_content_template = ERB.new(File.read(Rails.root + "app/views/support_ticket/ticket_content.text.erb"))
    ticket_text =  ticket_content_template.result_with_hash({context: ticket_template_context})

    payload = create_payload(support_ticket_request, ticket_text)
    rt_client = RequestTrackerClient.create
    rt_client.create(payload)
  end

  private

  def create_payload(support_ticket_request, ticket_text)
    payload = {
      Queue: @queue,
      Requestor: support_ticket_request.email,
      Cc: support_ticket_request.cc,
      Priority: @priority,
      Subject: support_ticket_request.subject,
      Text: ticket_text,
    }
    payload[:Attachments] = support_ticket_request.attachments if support_ticket_request.attachments
    return payload
  end

end