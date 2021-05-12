require 'ood_appkit/version'
require 'ood_appkit/configuration'
require 'ood_appkit/url'
require 'ood_appkit/files_rack_app'
require 'ood_appkit/markdown_template_handler'
require 'ood_appkit/log_formatter'
require 'ood_appkit/default_cookie_options'

# The main namespace for OodAppkit. Provides a global configuration.
module OodAppkit
  extend Configuration
  require 'ood_appkit/engine' if defined?(Rails)

  # A namespace to hold all subclasses of {Url}
  module Urls
    require 'ood_appkit/urls/public'
    require 'ood_appkit/urls/dashboard'
    require 'ood_appkit/urls/shell'
    require 'ood_appkit/urls/files'
    require 'ood_appkit/urls/editor'
  end
end
