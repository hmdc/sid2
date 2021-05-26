require 'securerandom'

class OodAppTest < ActiveSupport::TestCase

  test "should find jpeg image" do
    under_test = OodApp.new RouterMock.new("test/fixtures/ood_app/find_jpg")
    assert_equal "test/fixtures/ood_app/find_jpg/image.jpg", under_test.image_path.to_s
    assert_equal "/apps/image/name/type/owner", under_test.image_uri
  end

  test "should find gif image" do
    under_test = OodApp.new RouterMock.new("test/fixtures/ood_app/find_gif")
    assert_equal "test/fixtures/ood_app/find_gif/image.gif", under_test.image_path.to_s
    assert_equal "/apps/image/name/type/owner", under_test.image_uri
  end

  test "should find png image" do
    under_test = OodApp.new RouterMock.new("test/fixtures/ood_app/find_png")
    assert_equal "test/fixtures/ood_app/find_png/image.png", under_test.image_path.to_s
    assert_equal "/apps/image/name/type/owner", under_test.image_uri
  end

  test "should find svg image" do
    under_test = OodApp.new RouterMock.new("test/fixtures/ood_app/find_svg")
    assert_equal "test/fixtures/ood_app/find_svg/image.svg", under_test.image_path.to_s
    assert_equal "/apps/image/name/type/owner", under_test.image_uri
  end

  test "should default to iqss_logo.png image when no image is available" do
    under_test = OodApp.new RouterMock.new("test/fixtures/ood_app")
    assert_equal "test/fixtures/ood_app/image.jpg", under_test.image_path.to_s
    assert_equal "iqss_logo.png", under_test.image_uri
  end

  private

  class RouterMock
    def initialize(path)
      @router_path = Pathname.new(path)
    end
    def path
      return @router_path
    end
    def name
      "name"
    end
    def owner
      "owner"
    end
    def type
      "type"
    end
  end

end