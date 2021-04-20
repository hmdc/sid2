require 'test_helper'

class Ws::LaunchButtonTest < ActiveSupport::TestCase

  test "should have view field" do
    all_buttons = Ws::LaunchButton.all

    all_buttons.each do |key, value|
      assert_not_nil value[:view]
    end
  end

  test "should have token field except :terminal" do
    all_buttons = Ws::LaunchButton.all

    all_buttons.each do |key, value|
      next if key == :terminal
      assert_not_nil value[:token]
    end
  end

end