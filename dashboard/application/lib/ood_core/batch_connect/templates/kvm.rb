require "ood_core/refinements/hash_extensions"

module OodCore
  module BatchConnect
    class Factory
      using Refinements::HashExtensions

      # Build the basic template from a configuration
      # @param config [#to_h] the configuration for the batch connect template
      def self.build_kvm(config)
        context = config.to_h.symbolize_keys.reject { |k, _| k == :template }
        Templates::KVM.new(context)
      end
    end

    module Templates
      # A batch connect template that expects to start up a basic web server
      # within a batch job
      class KVM < Template
        def initialize(context = {})
          super
        end

        private
          # We need to know the VNC and websockify connection information
          def conn_params
            (super + [:monitorport, :serviceport, :vncport]).uniq
          end
      end
    end
  end
end
