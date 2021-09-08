module NavHelper
  NAV_ITEM_TITLE_MAP = [
    {from: "Clusters", to: "Terminals"},
    {from: "FAS-RC Shell Access", to: "Cannon"},
  ]

  NAV_LINK_MAP_BY_APP_NAME = ["files", "activejobs", "myjobs"]

  def map_nav_item(nav_item_title)
    NAV_ITEM_TITLE_MAP.each do |map_item|
      if (nav_item_title == map_item[:from])
        return map_item[:to]
      end
    end
    nav_item_title
  end

  def map_nav_link?(app_name)
    NAV_LINK_MAP_BY_APP_NAME.include? app_name&.downcase
  end

end
