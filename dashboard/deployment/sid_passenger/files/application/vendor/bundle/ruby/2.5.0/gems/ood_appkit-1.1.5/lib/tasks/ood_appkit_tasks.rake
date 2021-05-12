namespace :ood_appkit do
  desc "Restart the Passenger process for this App"
  task :restart => "tmp:clear" do
    touch "tmp/restart.txt"
  end
end
