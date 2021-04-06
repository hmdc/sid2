class NavConfig
    class << self
      attr_accessor :categories, :categories_whitelist, :category_whitelist
      alias_method :categories_whitelist?, :categories_whitelist
    end
    self.categories = ["Files", "Jobs", "Clusters", "Interactive Apps"]
    self.categories_whitelist = false

    App_whitelist_by_category = {"Interactive Apps" => ["arcgis", "jupyterlab", "matlab", "mathematica", "odysseyrd", "rstudio", "stata"]}

    def self.select_interactive_apps(app)
      if App_whitelist_by_category[app.category]
        App_whitelist_by_category[app.category].include?(app.name.downcase)
      else
        return true
      end
    end
end
