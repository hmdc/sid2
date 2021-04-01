class LaunchButton

  defaults = {
    bc_queue: "",
    bc_account: "",
    bc_num_slots: "1",
    bc_num_hours: "1",
    bc_email_on_started: "0"
  }

  rstudioData = defaults.merge({
    token: "sys/RStudio",
    view: { logo: "rstudio_logo.png",
            logoWidth: "200",
            p1: "Run RStudio Server",
            p2: "2 CPU cores and 4GB RAM",
          }
    })

  @@LAUNCH_BUTTONS = {
    rstudio: rstudioData,
  }

  def self.all
    @@LAUNCH_BUTTONS
  end
end