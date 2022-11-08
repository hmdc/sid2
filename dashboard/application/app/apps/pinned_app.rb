# Wrapper around OodApp to create and manage Pinned Apps
class PinnedApp < SimpleDelegator

  # All the configured "Pinned Apps". Returns an array of unique and already rejected apps
  # that may be problematic (inaccessible or idden and so on). Should at least return an
  # an empty array.
  #
  # @return [PinnedApp]
  def self.pinned_apps(tokens, all_apps)
    @pinned_apps ||= {}
    tokens_key = ActiveSupport::Cache.expand_cache_key(tokens)

    @pinned_apps[tokens_key] = tokens.to_a.each_with_object([]) do |token, pinned_apps|
      view = token.is_a?(Hash) ? token.fetch(:view, {}) : {}
      pinned_apps.concat Router.apps_from_token(token, all_apps).map{|app| PinnedApp.new(app, view_config: view)}
    end.uniq do |app|
      app.token.to_s
    end.reject do |app|
      # subapps are featured apps and this is the easiest way to tell if it's valid.
      # instead of say app.send(:sub_app_list).first.valid?
      app.links.empty?
    end
  end

  attr_reader :view_config

  def initialize(ood_app, view_config: {})
    super(ood_app)
    @view_config = view_config.to_h
  end
end
