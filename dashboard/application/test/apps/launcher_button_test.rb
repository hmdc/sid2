require 'securerandom'

class LauncherButtonTest < ActiveSupport::TestCase

  test "should throw exception when token is not provided" do
    assert_raises(ArgumentError) { create_launcher(app_token:nil, order:10) }
  end

  test "should throw exception when id is not provided" do
    assert_raises(ArgumentError) { create_launcher(id:nil, order:10) }
  end

  test "Implements <=> to order by order field with nulls last" do
    launchers = [create_launcher(id:"id_null_order", order:nil), create_launcher(id:"id_1", order:100), create_launcher(id:"id_2", order:-100), create_launcher(id:"id_3", order:0)]
    result = launchers.sort
    assert_equal "id_2", result[0].id
    assert_equal "id_3", result[1].id
    assert_equal "id_1", result[2].id
    assert_equal "id_null_order", result[3].id
  end

  test "active? should be false if token is invalid" do
    under_test = create_launcher(app_token:"invalid/app", order:10)
    assert_equal false, under_test.active?
  end

  test "order method should return configured order" do
    under_test = create_launcher(order:100)
    assert_equal 100, under_test.order
  end

  test "id method should return configured id" do
    under_test = create_launcher(id:"set_id", order:100)
    assert_equal "set_id", under_test.id
  end

  test "id method should return overridden id" do
    under_test = create_launcher(id:"set_id", id_override:"override_id", order:100)
    assert_equal "override_id", under_test.id
  end

  private

  def create_launcher(id:SecureRandom.uuid.to_s, app_token:"sys/app", id_override:nil, order:0)
    config = {
      id: id_override,
      order: order,
      form: {
        token: app_token
      }
    }

    metadata = {
      id: id
    }

    LauncherButton.new(metadata, config)
  end

end