require 'securerandom'

class LauncherButtonTest < ActiveSupport::TestCase

  setup do

  end

  test "Implements <=> to order by order field with nulls last" do
    launchers = [create_launcher(id="id_null_order", nil), create_launcher(id="id_1", 100), create_launcher(id="id_2", -100), create_launcher(id="id_3", 0)]
    result = launchers.sort
    assert_equal "id_2", result[0].id
    assert_equal "id_3", result[1].id
    assert_equal "id_1", result[2].id
    assert_equal "id_null_order", result[3].id
  end

  private

  def create_launcher(id=SecureRandom.uuid.to_s, order)
    config = {
      order: order,
      form: {
        token: "sys/app"
      }
    }
    metadata = {
      id: id
    }

    LauncherButton.new(metadata, config)
  end

end