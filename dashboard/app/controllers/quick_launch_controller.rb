class QuickLaunchController < ApplicationController
  def index
    @sessions = BatchConnect::Session.all
    @sessions.each do |session|
      session.update_cache_completed!
      session.redirect = root_url
    end

    default_partition =  ::Configuration.slurm_partition_info.get_default_partition
    @launchButtons = LaunchButton.all
    launchButtonsConfiguration = {}
    @launchButtons.each do |appId, appData|
      oodApp = BatchConnect::App.from_token appData[:token]
      #TODO: VALIDATE CLUSTER
      @launchButtons[appId][:cluster] = oodApp.clusters.first.id.to_s if oodApp.clusters.any?
      @launchButtons[appId][:bc_queue] = default_partition
      launchButtonsConfiguration[appId] = @launchButtons[appId].except(:view)
    end

    @launchButtonsJson = launchButtonsConfiguration.to_json
    render layout: "sid"
  end
end
