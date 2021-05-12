Rails.application.routes.draw do
  # Route for a Rack::Directory middleware app
  if OodAppkit.routes.files_rack_app
    mount OodAppkit::FilesRackApp.new => '/files', as: :files
  end

  # Route for hosting GitHub style wiki
  if OodAppkit.routes.wiki
    get 'wiki/*page' => 'ood_appkit/wiki#show', as: :wiki, content_path: 'wiki'
  end
end
