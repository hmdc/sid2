module NavHelper
  NAV_MAP = [
    {from: "Clusters", to: "Terminals"},
    {from: "FAS-RC Shell Access", to: "Cannon"},
  ]
  def map_nav_item(nav_item)
    NAV_MAP.each do |map_item|
      if (nav_item == map_item[:from])
        return map_item[:to]
      end
    end
    nav_item
  end
end
