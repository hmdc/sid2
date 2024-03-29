# Sid Dashboard for Open OnDemand

## Features

- **Navigation look and feel** - improved branding, styling, and menu text visibility
- **Restricted applications** - limiting the visible items in the "Interactive Apps" menu
- **Navigation** - customized menu items order and labels
- **Custom navigation items** - additional top-level navigation menu items
- **Quick launchers** - responsive, countoured, and informative quick launcher buttons
- **Terminate job without removing session metadata** - to allow post-mortem job inspection
- **Session panels on the dashboard home page** - quick access to launch and access jobs from the same page
- **Enhanced session information** - additional details about job status and resources
- **RT Ticket creation** - integration with Request Tracker for quick ticket creation, optionally with job context
- **Custom welcome message per cluster** - to provide high-visibility information about the serivce
- **Quick links** - responsive, countoured, and informative buttons linking to non-job resources and apps
- **Homepage help text** - additional text to supplement or replace the MOTD and welcome message

## Launching the Sid Dashboard development environment

The following will launch a Sid Dashboard development environment with:

- Slurmctld - Slurm master,
- Slurmdbd - Slurm database
- C1, C2 - Slurm execute nodes.
- OOD - OpenOnDemand node with Sid2 installed as as a [development-mode](https://osc.github.io/ood-documentation/master/app-development/enabling-development-mode.html) app.
- RT - Request tracker system

### Pre-requisites

- [Docker](https://docs.docker.com/engine/install)
- Docker-compose
- Make

**For Mac OS X only**, make sure that your Docker daemon is permitted to manipulate files in the `/User` path. Otherwise, the app will not run. Please see FILE SHARING in [https://docs.docker.com/docker-for-mac/](https://docs.docker.com/docker-for-mac/) for further instructions. This is most likely configured by default (it is for me, at least) but it may not be for different versions of OS X.

**This dev environment does not build properly/entirely on M1 (non-x86) Macs, just x86! CentOS7 does not have an M1 image nor does x86 emulation properly start Slurm as of now.**

### Development environment and Docker images

Docker images are used to create the local development environment. Information on how to build and upgrade these images is [here](docs/docker.md)

### Caveats, oddities.

- Due to OOD's requirement of running as **you**, the `Makefile` in this repository uses _your_ UID and GID as the UID and GID of the `ood` user. If you are running OS X and have a UID of < 1000, which is non-standard for Linux, this will still work - I've added a workaround, but, it's still preferable to stick with the constrained requirements if you can.
- You cannot launch this container stack as root. It will not work as OOD and Slurm explicitly forbids root user from accessing OOD in the standard configuration.
- JS/CSS changes _may_ not happen automatically at this point due to the requirement to run `rake assets:precompile` to minify, package JS and CSS. Ruby code changes are reflected immediately.
- You may run into odd startup issues if you don't run `make down` when completed as there are shared volumes. Clean up the environment by running `make down`. If you can't start OOD, run `make down` so you can check if you forgot to clean up the compose stack. I often forget now and then. **FIXME** find a way when Ctrl+C out of Make it runs make down.

### Launching

- Run `make` from checkout. The build process is finished when the `ood` container stops generating output, and the `slurmctld` container goes into an output loop.
- The entire `application` build directory is mapped into the OOD and slurm containers. Changes made to code will immediately reflect within OOD (with the exception of CSS/JS changes which requires a rake, see Caveats.)

### Connecting

- After the containers have started, connect to OOD dashboard application (HTTPS): [https://localhost:33000](https://localhost:33000)
- We are using a self-signed certificate, we must configure our browser to allow unsecure connections to the Sid Dashboard
   - Firefox, "Warning potential security risk ahead". Select `Advanced > Accept the risk and continue`
   - Chrome, we must enable insecure localhost flag: `chrome://flags/#allow-insecure-localhost`
   - Safari, "This connection is not private". Select `Show Details > Visit the website`. Accept changes to the `Certificate Trust Settings`
- Login with username `ood`, password `ood`.
- To connect to RT, use: [http://localhost:34000](http://localhost:34000)
- Login with username `root`, password `password`

### Validation

- Can you run and connect to RStudio through the original OpenOnDemand dashboard?
- Is the Develop menu on the top-bar visible?
- Can you get into the Develop menu, select My SandBox Apps, and launch the Sid2 Ood Dashboard?
- Does OOD prompt you to "initialize" the app after launching Sid2 from the developer menu? (It should..)
- After application is initialized, does it show Sid2?
- For further validation tests see https://wiki.harvard.edu/confluence/display/HMDC/Testing+Sid2

### Stopping

- Run `make down`

### Cleaning up

- Run `make clean`

To thoroughly purge your Docker environment, also run `docker volume prune; docker system prune -a` and restart Docker.

## Deploying to remote development

The Sid Dashboard can be deployed to a "remote development" environment, i.e. a directory on an Open OnDemand server that has been [configured to support running development-mode apps](https://osc.github.io/ood-documentation/latest/app-development/enabling-development-mode.html).

### Cannon
- Run `make remote-dev`. `make remote-dev` builds all required OOD/Ruby libs locally and exports built artifacts to FASRC. This task will prompt you for your FASRC credentials (password and pin) more than once as it retrieves files, creates/validates the pre-requisite directory structure, and deploys the app to your home directory. For detailed deployment instructions see https://wiki.harvard.edu/confluence/display/HMDC/Deploying+Sid2+to+Remote+Dev .

- This target does a verification of the local version of the `turbovnc` and `kvm` templates against Staging. If the files diverge, a warning message will be shown. If this is the case, raise an issue to update the templates with the latest version from production.

- Once completed, visit:

  https://vdi.rc.fas.harvard.edu/pun/dev/dashboard

### FASSE
- Run `make remote-fasse`. `make remote-fasse` builds as before and deploys to FASSE. This task will prompt you for your FASRC credentials (password and pin) more than once as it retrieves files, creates/validates the pre-requisite directory structure, and deploys the app to your home directory.
  
- Once completed, visit:

  https://fasseood.rc.fas.harvard.edu/pun/dev/dashboard

## Support Ticket Feature

The Sid Dashboard supports creating tickets in Request Tracker using a simple point-and-click interface which collects contextual information about the relevant session and includes it in the ticket.

### Ticket attachment limitations

There are restrictions in place for the attachments. These limits should be set lower than the limits configured in the Request Tracker server.

There is client side validation:
 * Attachment files cannot be bigger than 5MB
 * Number of attachment files cannot be bigger than 5
 * To update: [application/app/assets/javascripts/support_ticket.js#L6](application/app/assets/javascripts/support_ticket.js#L6)

And there is back-end validation:
 * Attachment files cannot be bigger than 6MB
 * Number of attachment files cannot be bigger than 8
 * To update: [application/app/models/attachments_validator.rb#L7](application/app/models/attachments_validator.rb#L7)

## RT server configuration

In the local development environment, RT is deployed using a Docker image. The version of RT is controlled by the version of the Docker image. The versions supported can be found at [https://hub.docker.com/r/netsandbox/request-tracker/](https://hub.docker.com/r/netsandbox/request-tracker/) .

To upgrade the RT version, simply update the version in the Docker compose file: [docker-compose.yml](docker-compose.yml)

```
services:
  rt:
    image: netsandbox/request-tracker:4.4
```

Configure the RT client in the file: `application/config/rt_config.yml`, eg:
```
server: "https://rt.example.com"
user: "test"
pass: "password"
auth_token: "secret"
timeout: 30
verify_ssl: true
proxy: "http://proxy.example.com:8080"
priority: 4
queues:
  - "General"
  - "Incoming"
```

**WARNING**: The information in the RT client configuration file will be visible to all Sid Dashboard users, so be sure to use an account that does not have privileges to do anything more than what ticket requestors should be allowed to do in RT.

As follows:
- `server`: URL for the RT server (required)
- `user`: RT API username
- `pass`: RT API password
- `auth_token`: RT API [auth token](https://github.com/bestpractical/rt-authen-token), preferred instead of username and password.
- `timeout`: Connection and read timeout in seconds. Defaults to 30.
- `verify_ssl`: Whether or not the client should validate SSL certificates. Defaults to true.
- `proxy`: Proxy server URL. Defaults to no proxy.
- `priority`: The [priority](https://rt-wiki.bestpractical.com/wiki/Priority) for the ticket. Defaults to 4.
- `queues`: An array of the names of the queues from which the user can select to submit a ticket. The first item in the list will be the default selection. Defaults to [ "General" ].

### RT configuration for remote-dev

To test the support ticket creation in `remote-dev`, we need to manually add the configuration for the RT client before executing the `remote-dev` deployment.

Create the configuration file `application/config/rt_config.yml` with the appropriate credentials for your remote development RT server.

For detailed deployment instructions for Harvard FASRC Cannon, see https://wiki.harvard.edu/confluence/display/HMDC/Deploying+Sid2+to+Remote+Dev .

## Launcher button configuration

To add or update launcher buttons, follow the instructions [here](docs/launchers.md)

## Quick links configuration

To add or update quick link buttons, follow the instructions [here](docs/quick_links.md)

