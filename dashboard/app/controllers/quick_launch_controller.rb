class QuickLaunchController < ApplicationController
  def index
    @sessions = BatchConnect::Session.all
    @sessions.each(&:update_cache_completed!)
    render layout: "sid"
  end
end
