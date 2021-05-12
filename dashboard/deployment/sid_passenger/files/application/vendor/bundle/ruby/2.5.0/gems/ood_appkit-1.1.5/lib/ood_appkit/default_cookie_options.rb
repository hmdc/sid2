module OodAppkit
  module DefaultCookieOptions
    def handle_options(options)
      if base_uri = ENV["RAILS_RELATIVE_URL_ROOT"]
        options[:path] = base_uri unless /^#{Regexp.quote base_uri}/ =~ options[:path]
      end
      super(options)
    end
  end
end

ActionDispatch::Cookies::CookieJar.prepend OodAppkit::DefaultCookieOptions
