require 'test_helper'

class Ws::LaunchButtonTest < ActiveSupport::TestCase

  test "should have token field" do
    all_buttons = Ws::LaunchButton.all

    all_buttons.values do |key, value|
      assert_not_nil value[:token]
    end
  end

end