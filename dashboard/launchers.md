# Launcher Buttons Configuration

## Types of Launcher Configurations

Launcher button configurations are YAML files that can be specified either as [Internal Launcher Files](#internal-launcher-files), within the `Sid Dashboard`, or as [External Launcher Files](#external-launcher-files), within each OOD application's installation directory.

## Internal Launcher Files
Internal launcher files are configured within the `Sid Dashboard` code base, under the directory: `application/config/launchers`
All files within this folder are expected to be in YAML format and will be used to create launcher buttons.

### Launcher Configuration
Launcher configuration files have 3 sections: top-level metadata keys, the `form` hash, and the `view` hash. [See example for Rstudio configuration](application/config/launchers/rstudio.yml)

#### Top-level Metadata
Configuration section at the root of the file to set the following keys:
* `id` is a unique identifier for each launcher. External Launchers with the same `id` as Internal Launchers will override their configuration.
Default `id` value is taken from the filename without the extension.
* `order` is an integer value used to order the list of launchers. Smallest value goes first. Negative values are allowed.
* `cluster` optional string property, defaults to the main cluster. It is used to specify the cluster the launcher is operational for.
* `status` optional string property, defaults to `active`. It is used to disable a launcher without deleting the configuration file. If status!=`active`, the launcher will not appear in the Sid dashboard.

#### Form
Configuration section to set the runtime options for the application. The options follow the same naming as those in the form that OOD uses to launch interactive applications.
* `token` identifies the application that the launcher will execute within OOD. This follows the OOD notation to identify applications, eg: `sys/Stata`.
* `bc_queue` identifies what queue/partition the application will be executed against. If not provided, the system will assign the cluster default partition.
* `option_name` any other option that you want to provide a value for. You can gather all available options by inspecting the existing forms used to launch the application in OOD. 

#### View
Configuration section for the display options for the launcher button
* `logo:` optional path to the image to display in the launcher. If not value is set, the default will be used: `iqss_logo.png`. The field takes a path relative from the application assets folder: `application/app/assets/images`, eg: `rstudio_logo.png`. It supports all image types.
* `logoWidth:` integer value used to adjust the logo width to the space in the launcher button. The height will adjust automatically keeping the logo aspect ratio.
* `style:` optional css style added to the logo HTML mainly to adjust the top margin. eg: `margin-top: 10px;`
* `p1`, `p2`, and `p3` are used to display text within the launcher. Each `p` represents a line of text. Set to `nil` to display an empty line.

### Showing/Hiding Launchers on the Sid Dashboard index page
The index page that displays all the launcher buttons has some safeguards. It will not show a launcher button in any of the following conditions:
* `cluster:` will only show the launcher in the specified cluster.
* `status:` if the status value is not `active`.
* `token:` the value is for an application that is not installed or is invalid.
* `bc_queue:` the partition is not accessible for the current user or is invalid.

## External Launcher Files
External launcher files are configured by system administrators within the OOD installation. These files that can be added to each of the installed applications that OOD can execute from the interactive apps section.
These applications are installed under: `/var/www/ood/apps/sys`. To configure an external launcher, we need to add a `launcher_button.yml` file within the application folder we want a launcher button for. See example for local environment: [application/launchers/Rstudio/launcher_button.yml](application/launchers/Rstudio/launcher_button.yml)

External launcher files have the same configuration properties as Internal Launchers, but there are some minor changes:
* `id:` default id value comes from the name of the application as provided by OOD. OOD creates the application name from the folder name. This value can be overridden with the `id` field.
* `token:` is automatically populated by the system based on the application. Cannot be overridden.
* `logo:` to display a custom image, an `image.{jpg|gif|png|svg}` file can be added to the application directory. If available, this image will be used in the launcher button. If no image file is added, the default will be used:`iqss_logo.png`

## Launchers API
There is an API endpoint that shows all launchers with its configuration.  
It returns a list of all the internal and external launchers available in the system. The launchers are ordered by the order property: smaller values first, nil/missing values last.

`<application-root>/ws/launchers`