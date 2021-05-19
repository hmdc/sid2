# Set up gems listed in the Gemfile.
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.

# load dotenv files before "before_configuration" callback
require File.expand_path('../configuration_singleton', __FILE__)

# global instance to access and use
Configuration = ConfigurationSingleton.new
Configuration.load_dotenv_files

# set defaults to address OodAppkit.dataroot issue
#ENV['OOD_DATAROOT'] = Configuration.dataroot.to_s
local_dataroot = "~/#{ENV['OOD_PORTAL'] || 'ondemand'}/data/#{ENV['APP_TOKEN'] || 'sys/dashboard'}"
ENV['OOD_DATAROOT'] = Pathname.new(local_dataroot).expand_path.to_s
ENV['OOD_BRAND_BG_COLOR'] = "#F0F0F0"
ENV['OOD_BRAND_LINK_ACTIVE_BG_COLOR'] = "#3B3D3F"


# Rails 5.2.3 suggests adding bootsnap (https://github.com/Shopify/bootsnap)
# which writes to /tmp as it does not appear to write to a user-namespaced
# location and it does not clean up after itself, bootsnap seems like a poor 
# fit for OnDemand, and I am not including it at this time.
# require 'bootsnap/setup' # Speed up boot time by caching expensive operations.