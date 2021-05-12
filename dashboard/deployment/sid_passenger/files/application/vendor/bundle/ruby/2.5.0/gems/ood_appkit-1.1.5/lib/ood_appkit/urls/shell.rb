module OodAppkit
  module Urls
    # A class used to handle URLs for the system Shell app.
    class Shell < Url
      # @param (see Url#initialize)
      # @param ssh_url [#to_s] the ssh URL used to access the terminal
      def initialize(ssh_url: '/ssh', template: '{/url*}/{host}{+path}', **kwargs)
        super(template: template, **kwargs)
        @ssh_url = parse_url_segments(ssh_url.to_s)
      end

      # URL to access this app for a given host and absolute file path
      # @param opts [#to_h] the available options for this method
      # @option opts [#to_s, nil] :host ("default") The host the app will make
      #   an ssh connection to
      # @option opts [#to_s, nil] :path ("") The absolute path to the directory
      #   the ssh app opens up in
      # @return [Addressable::URI] the url used to access the app
      def url(opts = {})
        opts = opts.to_h.compact.symbolize_keys

        host = opts.fetch(:host, "default").to_s
        path = opts.fetch(:path, "").to_s
        @template.expand url: @base_url + @ssh_url, host: host, path: path
      end
    end
  end
end
