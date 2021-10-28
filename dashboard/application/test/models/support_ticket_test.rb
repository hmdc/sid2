require 'test_helper'

class SupportTicketTest < ActiveSupport::TestCase

  def setup
    @ticket_parameters = {
      username: "username",
      email: "email@example.com",
      cc: "cc@example.com",
      subject: "subject",
      session_id: "session_id",
      description: "description",
      attachments: [],
    }
  end

  test "all fields populated has no validation errors" do
    target = SupportTicket.new(@ticket_parameters)

    assert target.valid?
  end

  test "username is required" do
    @ticket_parameters[:username] = nil
    target = SupportTicket.new(@ticket_parameters)

    refute target.valid?
    assert_equal 1, target.errors.size
    assert_equal "is required", target.errors[:username][0]
  end

  test "email is required" do
    @ticket_parameters[:email] = nil
    target = SupportTicket.new(@ticket_parameters)

    refute target.valid?
    assert_equal 1, target.errors.size
    assert_equal "is required", target.errors[:email][0]
  end

  test "email format must be an email address" do
    @ticket_parameters[:email] = "not-an-email.com"
    target = SupportTicket.new(@ticket_parameters)

    refute target.valid?
    assert_equal 1, target.errors.size
    assert_equal "format is invalid", target.errors[:email][0]
  end

  test "cc format must be an email address" do
    @ticket_parameters[:cc] = "not-an-email.com"
    target = SupportTicket.new(@ticket_parameters)

    refute target.valid?
    assert_equal 1, target.errors.size
    assert_equal "format is invalid", target.errors[:cc][0]
  end

  test "subject is required" do
    @ticket_parameters[:subject] = nil
    target = SupportTicket.new(@ticket_parameters)

    refute target.valid?
    assert_equal 1, target.errors.size
    assert_equal "is required", target.errors[:subject][0]
  end

  test "description is required" do
    @ticket_parameters[:description] = ""
    target = SupportTicket.new(@ticket_parameters)

    refute target.valid?
    assert_equal 1, target.errors.size
    assert_equal "is required", target.errors[:description][0]
  end

  test "attachments - is optional, nil is supported" do
    @ticket_parameters[:attachments] = nil
    target = SupportTicket.new(@ticket_parameters)

    assert target.valid?
  end

  test "attachments - maximum 8 attachments" do
    max_items = AttachmentsValidator.config[:items] + 1
    attachments = [*1..max_items].map { |item| mock("attachment_#{item}") }
    @ticket_parameters[:attachments] = attachments
    target = SupportTicket.new(@ticket_parameters)

    refute target.valid?
    assert_equal 1, target.errors.size
    assert_equal "are invalid. #{attachments.size} attachments added, maximum number of items is #{AttachmentsValidator.config[:items]}", target.errors[:attachments][0]
  end

  test "attachments - maximum size is 6MB" do
    attachment =  mock("attachment")
    attachment.stubs(:size).returns(AttachmentsValidator.config[:size] + 1)
    @ticket_parameters[:attachments] = [attachment]
    target = SupportTicket.new(@ticket_parameters)

    refute target.valid?
    assert_equal 1, target.errors.size
    assert_equal  "are invalid. Maximum attachment size is 6MB", target.errors[:attachments][0]
  end

end