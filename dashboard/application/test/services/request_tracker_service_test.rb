require 'test_helper'

class RequestTrackerServiceTest < ActiveSupport::TestCase

  test "should throw exception when queue_name is not provided" do
    config = {
      queue_name: nil,
      priority: "33",
    }

    assert_raises(ArgumentError) { RequestTrackerService.new(config) }
  end

  test "should throw exception when priority is not provided" do
    config = {
      queue_name: "Standard",
      priority: nil,
    }

    assert_raises(ArgumentError) { RequestTrackerService.new(config) }
  end

  test "create_ticket should run with no errors" do
    service_config = {
      queue_name: "Standard",
      priority: "10",
    }

    support_ticket = SupportTicket.new(email: "email@example.com", cc: "cc@example.com", subject: "Subject")

    mock_rt_client = mock("rt_client")
    mock_rt_client.expects(:create).with do |param_hash|

      param_hash[:Requestor] == support_ticket.email &&
      param_hash[:Cc] == support_ticket.cc &&
      param_hash[:Subject] == support_ticket.subject &&
      param_hash[:Queue] == service_config[:queue_name] &&
      param_hash[:Priority] == service_config[:priority]
    end
    .returns("support_ticket_id")

    BatchConnect::Session.stubs(:find).returns(mock("session"))
    RequestTrackerClient.stubs(:create).returns(mock_rt_client)

    result = RequestTrackerService.new(service_config).create_ticket(support_ticket)

    assert_equal "support_ticket_id", result
  end

end