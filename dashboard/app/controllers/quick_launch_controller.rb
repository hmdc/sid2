class QuickLaunchController < ApplicationController
  def index
    @sessions = BatchConnect::Session.all
    @sessions.each do |session|
      session.update_cache_completed!
      session.redirect = root_url
    end

    @launchButtons = Ws::LaunchButton.all
    launchButtonsConfiguration = {maxSessions: helpers.quick_launch_max_sessions}
    #ADD CLUSTER AND DEFAULT PARTITION INFO TO BUTTON CONFIG
    #IF NO CLUSTER IS NIL, THE BUTTON WILL NOT BE RENDERED
    @launchButtons.each do |appId, appData|
      next if !appData[:token]
      oodApp = BatchConnect::App.from_token appData[:token]
      cluster_id = oodApp.clusters.first.id.to_s if oodApp.clusters.any?
      cluster_metadata = ::Configuration.cluster_metadata.select{|metadata| metadata.cluster_id == cluster_id}.first
      #TODO: VALIDATE CLUSTER
      @launchButtons[appId][:cluster] = cluster_id if cluster_id
      @launchButtons[appId][:bc_queue] = cluster_metadata.default_partition if cluster_metadata
      launchButtonsConfiguration[appId] = @launchButtons[appId].except(:view)
    end

    @launchButtonsJson = launchButtonsConfiguration.to_json
    render layout: "sid"
  end
end
