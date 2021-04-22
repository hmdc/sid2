module Ws
  class LaunchButton
    #CLUSTER ID AND QUEUE NAME ARE ADDED IN QUICK LAUNCH CONTROLLER

    defaults = {
      bc_account: "",
      bc_num_slots: "1",
      bc_num_hours: "1",
      custom_memory_per_node: "4",
      custom_num_cores: "2",
      custom_num_gpus: "0",
      custom_time: "04:00:00",
      envscript: "",
      custom_email_address: "",
      bc_email_on_started: "0",
      custom_reservation: ""
    }

    rstudioData = defaults.merge({
      token: "sys/Rstudio",
      r_version:	"R/4.0.5-fasrc01",
      rlibs: "",
      custom_vanillaconf: "1",

      view: { logo: "rstudio_logo.png",
              logoWidth: "200",
              p1: "Run Rstudio Server",
              p2: "2 CPU cores and 4GB RAM",
              p3: "[4hr] Job run time",
            }
      })

    desktopData = defaults.merge({
      token: "sys/OdysseyRD",
      bc_vnc_resolution: "1024x768",
      custom_desktop: "1",
      matlab_version: "NULL",
      rstudio_version: "NULL",
      r_version: "R/3.3.3-fasrc01",
      rlibs: "",

      view: { logo: "desktop_logo.svg",
              logoWidth: "100",
              style: "margin-top: 5px;",
              p1: "Run FAS-RC Remote Desktop",
              p2: "2 CPU cores and 4GB RAM",
              p3: "[4hr] Job run time",
            }
     })

    jupiterLabData = defaults.merge({
       token: "sys/JupyterLab",
       custom_memory_per_node: "8",
       custom_num_cores: "1",
       view: { logo: "jupyter_logo.svg",
               logoWidth: "85",
               style: "margin-top: -10px;",
               p1: "Run Jupiter Lab",
               p2: "1 CPU core and 8GB RAM",
               p3: "[4hr] Job run time",
       }
    })

    stataData = defaults.merge({
        token: "sys/Stata",
        bc_vnc_resolution: "1024x768",
        stata_version: "stata/16.0-fasrc01",
        custom_memory_per_node: "8",
        custom_num_cores: "1",
        view: { logo: "stata_logo.svg",
                logoWidth: "200",
                style: "margin-top: 15px;",
                p1: "Run Stata",
                p2: "1 CPU core and 8GB RAM",
                p3: "[4hr] Job run time",
        }
      })

    sasData = defaults.merge({
       token: "sys/SAS",
       bc_vnc_resolution: "1024x768",
       custom_memory_per_node: "4",
       custom_num_cores: "1",
       view: { logo: "sas_logo.png",
               logoWidth: "180",
               style: "margin-top: 3px",
               p1: "Run SAS",
               p2: "1 CPU core and 4GB RAM",
               p3: "[4hr] Job run time",
       }
     })

    terminalData = {
      #URL FOR THE SHELL APP FOR THE CLUSTER LOGIN NODE. SELECT THE FIRST ONE. OOD SUPPORTS MULTIPLE, ONE PER CLUSTER
      view: { url: SysRouter.apps.select {|app| app.name == "shell"}.first&.links&.first&.url,
              logo: "term_logo.svg",
              logoWidth: "125",
              style: "margin-top: -18px;",
              p1: nil,
              p2: nil,
              p3: "Open a web based terminal session",
      }
    }


    @@LAUNCH_BUTTONS = {
      rstudio: rstudioData,
      rdesktop: desktopData,
      jupiterlab: jupiterLabData,
      stata: stataData,
      sas: sasData,
      terminal: terminalData,
    }

    def self.all
      @@LAUNCH_BUTTONS
    end
  end
end