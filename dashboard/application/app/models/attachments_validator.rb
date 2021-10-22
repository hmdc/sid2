class AttachmentsValidator < ActiveModel::EachValidator
  # CHECK FOR FILE SIZE.
  # 2MB = 2097152
  # 5MB = 5242880
  # 6MB = 6291456
  # 10MB = 10485760
  MAX_ATTACHMENT = { items: 8, size: 6291456, message: "6MB" }

  def self.config
    return MAX_ATTACHMENT
  end

  def validate_each(record, attribute, value)
    if value.blank?
      #ATTACHMENTS IS OPTIONAL
      return
    end

    if value.size > MAX_ATTACHMENT[:items]
      record.errors.add attribute, "are invalid. #{value.size} attachments added, maximum number of items is #{MAX_ATTACHMENT[:items]}"
      return
    end

    value.each do |attachment|
      if attachment.size > MAX_ATTACHMENT[:size]
        record.errors.add attribute, "are invalid. Maximum attachment size is #{MAX_ATTACHMENT[:message]}"
        return
      end
    end
  end
end