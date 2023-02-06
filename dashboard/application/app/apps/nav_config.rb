class NavConfig
    class << self
      attr_accessor :categories, :categories_whitelist, :category_whitelist, :apps_whitelist
      alias_method :categories_whitelist?, :categories_whitelist
    end
    self.categories = ["Files", "Jobs", "Clusters", "Interactive Apps"]
    self.categories_whitelist = false
    self.apps_whitelist = true

    App_whitelist_by_category = {"Interactive Apps" => ["arcgis", "jupyter", "matlab", "mathematica", "nativerd", "remotedesktop", "rstudioserver", "stata", "sas"]}

    def self.select_interactive_apps(app)
      if apps_whitelist && App_whitelist_by_category[app.category]
        App_whitelist_by_category[app.category].include?(app.name.downcase)
      else
        return true
      end
    end
end
