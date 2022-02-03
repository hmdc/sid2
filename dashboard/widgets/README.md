# IQSS Widgets

This folder contains Open OnDemand widgets developed by the IQSS team.
We created these widgets to allow the community to play with some of the features that we developed for the Sid dashboard application.

We have developed these widgets to be self contained whenever possible to help with the installation and configuration.

Each folder is independent and contains a single widget.

## Quick Launchers Widget - launchers folder

This self contained widget can start an interactive session with pre-configured application parameters.
This works by submitting a pre-filled application form to the `BatchConnect` controller.

### Installation

To install this widget, the `launchers` folder needs to be copied into the `dashboard/apps/views/widgets` folder.
Then add the this widget into the configuration `dashboard_layout` as: `launchers/launchers_widget`

Add your quick launchers as Yaml files into the `dashboard/apps/views/widgets/launchers`. Use the `rstudio.yml` or `rdesktop.yml`sample configurations as a reference.

Restart your OnDemand server and the quick launchers will appear on the homepage.

### Launcher Configuration

Each launcher configuration has 3 components: `metadata`, `view`, and `form`.

- `metadata` holds high level information about the launcher.
- `view` configures the image and text use to render the launcher.
- `form` is the data submitted as the application form to start the interactive session.

To identify what application to execute, we use `form.token` parameter.
This is the BatchConnect `token` with the format: `router/app_name`.
The widget will only render the launcher buttons that have a valid application configured.

Configuration example with context information:
```
    # /etc/ood/config/ondemand.d/ondemand.yml
    launchers:
    - # Optional number to arrange launchers.
      # Smallest numbers go first, null values go last.
      order: 100
      # View component configures the look and feel of the launcher.
      view:
        # Optional color for the quick launcher border. Defaults to #2D9BF0
        color: "#2D4BF0"
        # Optional URL to an image. This can be a relative or absolute URL.
        # If no image is provided, the configured icon for the form.token application will be used.
        logo: "/public/rstudio_logo.svg"
        # Image width adjustments to HTML
        logo_width: "85"
        # CSS adjustments to the image
        logo_style: "margin-top: -5px;"
        # Optional text to add to the launcher.
        p1: "Run RStudio"
        p2:
        p3: "1 hour job run time"
      # Form component configures the data that will be submitted.
      # These can be taken from the application form batch_connect_session_context field.
      form:
        # the application that we want to launch.
        token: "sys/rstudio"
        # Any other application parameter needed.
        # This parameters need to be supported by the BatchConnect functionality
        bc_queue: "test"
        bc_num_hours: "1"
```
