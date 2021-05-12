module OodAppkit
  module Urls
    # A class used to handle URLs for the system file Editor app.
    class Editor < Url
      # @param (see Url#initialize)
      # @param edit_url [#to_s] the URL used to request the file editor api
      def initialize(edit_url: '/edit', template: '{/url*}{+path}', **kwargs)
        super(template: template, **kwargs)
        @edit_url = parse_url_segments(edit_url.to_s)
      end

      # URL to access this app's file editor API for a given absolute file path
      # @param opts [#to_h] the available options for this method
      # @option opts [#to_s, nil] :path ("") The absolute path to the file on
      #   the filesystem
      # @return [Addressable::URI] absolute url to access path in file editor
      #   api
      def edit(opts = {})
        opts = opts.to_h.compact.symbolize_keys

        path = opts.fetch(:path, "").to_s
        @template.expand url: @base_url + @edit_url, path: path
      end
    end
  end
end
