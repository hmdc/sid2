require 'test_helper'

class TokenMatcherTest < ActiveSupport::TestCase

  test "token should be return token parameter" do
    target = TokenMatcher.new("sys/app")
    assert_equal("sys/app" , target.token)

    target = TokenMatcher.new({token: "sys/app", type: "sys"})
    assert_equal({token: "sys/app", type: "sys"} , target.token)
  end

  test "app token should match app" do
    target = TokenMatcher.new("sys/app")
    app = OodApp.new(Router.router_from_token("sys/app"))
    assert_equal true, target.matches_app?(app)
  end

  test "app token should match sub app" do
    target = TokenMatcher.new("sys/app")
    app = OodApp.new(Router.router_from_token("sys/app/sub_app"))
    assert_equal true, target.matches_app?(app)
  end

  test "sub app token should match sub app" do
    target = TokenMatcher.new("sys/app/sub_app")
    app = BatchConnect::App.from_token("sys/app/sub_app")
    assert_equal true, target.matches_app?(app)
  end

  test "sub app token should not match different sub app" do
    target = TokenMatcher.new("sys/app/sub_app")
    app = BatchConnect::App.from_token("sys/app/different_sub_app")
    assert_equal false, target.matches_app?(app)
  end

  test "sub app token should not match app" do
    target = TokenMatcher.new("sys/app/sub_app")
    app = OodApp.new(Router.router_from_token("sys/app"))
    assert_equal false, target.matches_app?(app)
  end

  test "token match should match application token" do
    %i[type category subcategory token title sub_title icon_uri].each do |item|
      target = TokenMatcher.new({ token: "app/token/value" })
      app = stub({token: "app/token/value"})
      assert_equal true, target.matches_app?(app)
    end
  end

  test "type, category, subcategory, token, and view should not trigger metadata match" do
    %i[other items should match].each do |item|
      target = TokenMatcher.new({ item => "value" })
      assert_equal true, target.matchers.any?{|matcher| matcher == 'metadata_match?'}, "Expected field: #{item} to create a metadata_match? matcher"
    end

    %i[type category subcategory token view].each do |item|
      target = TokenMatcher.new({ item => "value" })
      assert_equal false, target.matchers.any?{|matcher| matcher == 'metadata_match?'}, "Expected field: #{item} not to create a metadata_match? matcher"
    end
  end

end