module OodAppkit
  # Class used to handle markdown views in `ActionView::Template`
  module MarkdownTemplateHandler
    # String of ruby code to be evaluated when rendering the view
    # @param template [ActionView::Template] the template to be rendered
    # @return [String] string of ruby code to be evaluated
    def self.call(template)
      "begin;#{render(template.source)}.html_safe;end"
    end

    # Render markdown to HTML
    # @param text [String] markdown text
    # @return [String] escaped version of html text surrounded by quote marks
    def self.render(text)
      markdown.render(text).inspect
    end

    private
      # Markdown renderer used
      def self.markdown
        @markdown ||= OodAppkit.markdown
      end
  end
end

# Register this handler for the various markdown extensions
ActionView::Template.register_template_handler :md, :markdown, OodAppkit::MarkdownTemplateHandler
