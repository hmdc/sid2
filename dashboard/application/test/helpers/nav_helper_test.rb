require 'test_helper'

class NavHelperTest < ActionView::TestCase

  test "should be case sensitive" do
    result = map_nav_item("Clusters")
    assert_equal "Terminals", result

    result = map_nav_item("clusters")
    assert_equal "clusters", result
  end

  test "should map Clusters navigation item to Terminals" do
    result = map_nav_item("Clusters")
    assert_equal "Terminals", result
  end

  test "should map FAS-RC Shell Access navigation item to Cannon" do
    result = map_nav_item("FAS-RC Shell Access")
    assert_equal "Cannon", result
  end
end
