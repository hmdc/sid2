module OodAppkit
  # format log messages with timestamp severity and app token e.g.:
  #
  #     [2016-06-17 15:31:01 -0400 sys/dashboard]  INFO  GET...
  #
  class LogFormatter
    def call(severity, timestamp, progname, msg)
      severity_d = severity ? severity[0,5].rjust(5).upcase : "UNKNO"
      timestamp_d = timestamp ? timestamp.localtime : Time.now.localtime
      msg_d = (String === msg ? msg.strip.inspect : msg.inspect)

      "[#{timestamp_d} #{progname}] #{severity_d} #{msg_d}\n"
    end

    # make the Rails logger use this class for the formatter
    # and set the progname to be the app token
    def self.setup
      ::Rails.logger.formatter = LogFormatter.new

      # ActiveSupport::TaggedLogging.new calls
      #
      #     logger.formatter.extend(Formatter)
      #
      # in an undocumented submodule ActiveSupport::TaggedLogging::Formatter.
      # So to modify a TaggedLogging logger with another formatter we must
      # extend our formatter in the same way.
      if defined?( ActiveSupport::TaggedLogging  ) && ::Rails.logger.kind_of?( ActiveSupport::TaggedLogging )
        ::Rails.logger.formatter.extend(ActiveSupport::TaggedLogging::Formatter)
      end

      ::Rails.logger.progname = ENV['APP_TOKEN'] if ENV['APP_TOKEN']
    end
  end
end
