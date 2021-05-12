require 'addressable'

module OodAppkit
  # A generic class used to handle URLs for an app
  class Url
    # The title for this URL
    # @return [String] the title of the URL
    attr_reader :title

    # @param title [#to_s] the title of the URL
    # @param base_url [#to_s] the base URL used to access this app
    # @param template [#to_s] the template used to generate URLs for this app
    # @see https://www.rfc-editor.org/rfc/rfc6570.txt RFC describing template format
    def initialize(title: '', base_url: '/', template: '{/url*}/')
      @title = title.to_s
      @template = Addressable::Template.new template.to_s
      @base_url = parse_url_segments(base_url.to_s)
    end

    # URL to access this app
    # @return [Addressable::URI] the url used to access the app
    def url
      @template.expand url: @base_url
    end

    private
      # Parse URL segments into an array
      def parse_url_segments(url)
        url.split('/').reject(&:empty?)
      end
  end
end
