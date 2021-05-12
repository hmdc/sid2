module OodAppkit
  # Middleware that serves entries below the `root` given, according to the
  # path info of the Rack request.
  # @see http://www.rubydoc.info/github/rack/rack/master/Rack/Directory Descripton of `Rack::Directory`
  class FilesRackApp
    # The root path on file system that this app serves entries from below
    # @return [String] the root path
    attr_accessor :root

    # @param root [String, #to_s] the root path
    def initialize(root: OodAppkit.dataroot)
      @root = root.to_s
    end

    # Use `Rack::Directory` as middleware with `root` set as `dataroot` by
    # default
    def call(env)
      Rack::Directory.new(root).call(env)
    end
  end
end
