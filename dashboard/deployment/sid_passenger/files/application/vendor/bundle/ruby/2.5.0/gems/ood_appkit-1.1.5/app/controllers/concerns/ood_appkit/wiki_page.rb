# A concern that can be included into an `ApplicationController` that displays
# static relative-linked pages.
module OodAppkit::WikiPage
  extend ActiveSupport::Concern

  # 'included do' causes the included code to be evaluated in the context where
  # it is included (wiki_controller.rb), rather than being executed in the
  # module's context (wiki_page.rb).
  included do
    # prepend_view_path "docs"
  end

  # GET /wiki/Home
  # GET /wiki/uploads/project.zip
  def show
    @page = Rails.root.join(params['content_path']).join("#{params['page']}")

    respond_to do |format|
      format.html
      format.all { send_file "#{@page}.#{params[:format]}", disposition: 'inline' }
    end
  end
end
