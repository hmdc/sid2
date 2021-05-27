# Launcher Buttons Configuration

## Application Launchers
Application launchers are configured within the `Sid Dashboard` code base, under the directory: `application/config/launchers`
All files within this folder are expected to be in YAML format and will be used to create launcher buttons.

## Launcher configuration
Launcher configuration file have 3 sections: `metadata`, `form` and `view`. [See example for Rstudio configuration](application/config/launchers/rstudio.yml)
### Metadata
Configuration section at the root of the file to set:
* `id:` is a unique identifier for each launcher. System launchers with the same id as application launchers will override their configuration.
default id value is taken from the filename without the extension. Id Value can be overridden with the property `id` within the configuration file.
* `order:` this is an integer value used to order the list of launchers. Smallest value goes first. Negative values are allowed.
© string property. If status==disabled, the launcher will not appear in the Sid dashboard.

### Form
Configuration section to set the runtime options for the application. The options follow the same naming that OOD uses to launch interactive applications with the form.
* `token:` this identifies the application that the launcher will execute within OOD. This follows the OOD notation to identify applications, eg: `sys/Stata`.
* `bc_queue:` identifies what queue/partition the application will be executed against. If not provided, the system will assign the cluster default partition.
* `option_name:` any other option that we want to provide a value for. We can use the existing forms to launch the application in OOD to gather all available options. 

### View
Configuration section for the display options for the launcher button
* `logo:` Image file to display in the launcher. The field takes a path relative from the application assets folder: `application/app/assets/images`
* `logoWidth` and `style` fields are used to style the image with the space in the launcher button.
* `p1`, `p2`, and `p3` are used to display text within the launcher. Each `p` represents a line of text. Set to `nil` to display an empty line.

### Sid Dashboard index page
The index page that displays all the launcher buttons has some safeguards. It will not show a launcher button in the following conditions:
* `status:` if the status is `disabled`
* `token:` the value is for an application that is not installed or invalid
* `bc_queue:` the partition is not accessible for the current user or is invalid.

## System Launchers
System launchers are configured by system administrators within the OOD installation. These are files that can be added to each of the installed applications that OOD can execute from the interactive apps section.
These applications are installed under: `/var/www/ood/apps/sys`. To configure a launcher, we need to add a `launcher_button.yml` file within the application folder we want a launcher button for. See example for local environment: [application/launchers/Rstudio/launcher_button.yml](application/launchers/Rstudio/launcher_button.yml)

System launchers have the same configuration properties as application launchers, but there are some minor changes:
* `id:` default id value comes from the name of the application as provided by OOD. OOD creates the name from the folder name. This value can be overridden with the `id` field.
* `token:` is automatically populated by the system. Cannot be overridden.
* `logo:` to display an image, an `image.{jpg|gif|png|svg}` file can be added to the application directory. If available, this image will be used in the launcher button. If no image file is added, the default will be used:`iqss_logo.png`

## Launchers API
There is a launchers endpoint that shows all launchers with its configuration.  
It returns a list of all the launchers in order.

`<application-root>/ws/launchers`