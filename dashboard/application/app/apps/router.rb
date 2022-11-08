# frozen_string_literal: true

# Generic Router class (as opposed to SysRouter that is specific to system apps)
# is a utility class to query for applications.
class Router
  # Return a Router [SysRouter, UsrRouter or DevRouter] based off
  # of the input token. Returns nil if nothing is parsed correctly.
  #
  # return [SysRouter, UsrRouter or DevRouter]
  def self.router_from_token(token)
    type, *app = token.split('/')
    case type
    when 'dev'
      name, = app
      DevRouter.new(name)
    when 'usr'
      owner, name, = app
      UsrRouter.new(name, owner)
    when 'sys'
      name, = app
      SysRouter.new(name)
    end
  end

  def self.apps_from_token(token, all_apps)
    matcher = TokenMatcher.new(token)

    all_apps.each_with_object([]) do |app, apps|
      if app.has_sub_apps?
        apps.concat(featured_apps_from_sub_app(app, matcher))
      elsif matcher.matches_app?(app)
        apps.append(app)
      end
    end
  end

  private
  def self.featured_apps_from_sub_app(app, matcher)
    app.sub_app_list.each_with_object([]) do |sub_app, apps|
      apps.append(AppRecategorizer.new(app, token: sub_app.token)) if matcher.matches_app?(sub_app)
    end
  end
end
