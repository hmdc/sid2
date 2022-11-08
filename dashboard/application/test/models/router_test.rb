# frozen_string_literal: true

require 'test_helper'

class RouterTest < ActiveSupport::TestCase
  def setup
    # Configure the apps that are available from the SysRouter
    stub_sys_apps
  end

  def all_apps
    SysRouter.apps
  end

  test 'router_from_token should return SysRouter when token prefix is sys' do
    router = Router.router_from_token('sys/app')
    assert_equal true, router.is_a?(SysRouter)
  end

  test 'router_from_token should return SysRouter when token prefix is dev' do
    router = Router.router_from_token('dev/app')
    assert_equal true, router.is_a?(DevRouter)
  end

  test 'router_from_token should return SysRouter when token prefix is usr' do
    router = Router.router_from_token('usr/app')
    assert_equal true, router.is_a?(UsrRouter)
  end

  test 'router_from_token should return nil when token prefix is unknown' do
    router = Router.router_from_token('not_valid/app')
    assert_nil router
  end

  test 'apps_from_token should return [] when token does not match any application' do
    apps = Router.apps_from_token('sys/no_match_app', all_apps)
    assert_equal [], apps
  end

  test 'apps_from_token should return the app that matches the token' do
    apps = Router.apps_from_token('sys/bc_jupyter', all_apps)
    assert_equal ['sys/bc_jupyter'].to_set, apps.map(&:token).to_set
  end

  test 'apps_from_token should return sub_app when token matches a sub_app' do
    apps = Router.apps_from_token('sys/bc_desktop/owens', all_apps)
    assert_equal ['sys/bc_desktop/owens'].to_set, apps.map(&:token).to_set
  end

  test 'apps_from_token should return multiple apps and sub apps that match the token' do
    apps = Router.apps_from_token('sys/bc_*', all_apps)
    assert_equal ['sys/bc_desktop/oakley', 'sys/bc_desktop/owens', 'sys/bc_jupyter', 'sys/bc_paraview'].to_set,
                 apps.map(&:token).to_set
  end

  test 'token should accept a hash to match applications' do
    apps = Router.apps_from_token({ token: 'sys/bc_jupyter' }, all_apps)
    assert_equal ['sys/bc_jupyter'].to_set, apps.map(&:token).to_set

    apps = Router.apps_from_token({ machine_learning: 'true' }, all_apps)
    assert_equal ['sys/bc_jupyter'].to_set, apps.map(&:token).to_set
  end
end
