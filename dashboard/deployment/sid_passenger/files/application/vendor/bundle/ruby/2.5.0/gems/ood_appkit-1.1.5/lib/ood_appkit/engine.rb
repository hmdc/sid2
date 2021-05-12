require 'lograge'

module OodAppkit
  # The Rails Engine that defines the OodAppkit environment
  class Engine < Rails::Engine
    # Set default configuration options before initializers are called
    config.before_initialize do
      OodAppkit.set_default_configuration
    end

    # enable lograge if gem available
    initializer "lograge" do |app|
      if OodAppkit.enable_log_formatter
        # enable lograge to use with formatter
        app.config.lograge.enabled = true
      end
    end

    config.after_initialize do
      # Confirm the `OodAppkit.dataroot` configuration option was set
      raise UndefinedDataroot, "OodAppkit.dataroot must be defined (default: ENV['OOD_DATAROOT'])" unless OodAppkit.dataroot

      # setup logger to use proper formatter and set progname
      LogFormatter.setup if OodAppkit.enable_log_formatter
    end

    # An exception raised when `OodAppkit.dataroot` configuration option is undefined
    class UndefinedDataroot < StandardError; end
  end
end
