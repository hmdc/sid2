class SupportTicket
  include ActiveModel::Model

  attr_accessor :username, :email, :cc, :subject, :session_id, :description, :attachments
  validates :username, :email, :subject, :description, presence: { message: 'is required' }
  validates :email, :cc, format: { with: URI::MailTo::EMAIL_REGEXP, allow_blank: true, message: 'format is invalid' }
  validates :attachments, attachments: true

  def initialize(attributes={})
    super
    self.description ||= "Description of the problem:\n\n\nSteps to reproduce:\n1.\n2.\n3.\n\n\nActual results:\n\n\nExpected results:\n\n\nAdditional info:"
  end

end
