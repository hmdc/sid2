# Sid2

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

### Caveats, oddities.

- Due to OOD's requirement of running as **you**, the `Makefile` in this repository uses _your_ UID and GID as the UID and GID of the `ood` user. If you are running OS X and have a UID of < 1000, which is non-standard for Linux, this will still work - I've added a workaround, but, it's still preferable to stick with the constrained requirements if you can.
- You cannot launch this container stack as root. It will not work as OOD and Slurm explicitly forbids root user from accessing OOD in the standard configuration.
- JS/CSS changes _may_ not happen automatically at this point due to the requirement to run `rake assets:precompile` to minify, package JS and CSS. Ruby code changes are reflected immediately.
- You may run into odd startup issues if you don't run `make down` when completed as there are shared volumes. Clean up the environment by running `make down`. If you can't start OOD, run `make down` so you can check if you forgot to clean up the compose stack. I often forget now and then. **FIXME** find a way when Ctrl+C out of Make it runs make down.

### Launching

- Run `make` from checkout. The build process is finished when the `ood` container stops generating output, and the `slurmctld` container goes into an output loop.
- The entire directory/checkout is mapped into the OOD and slurm containers. Changes made to code will immediately reflect within OOD (with the exception of CSS/JS changes which requires a rake, see Caveats.)

### Connecting

- After the containers have started, connect to OOD dashboard application: [http://localhost:33000](http://localhost:33000)
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

## Deploying to remote development (your FASRC account)

- Run `make remote-dev`. `make remote-dev` builds all required OOD/Ruby libs locally and exports built artifacts to FASRC. This task will prompt you for your FASRC SSH credentials (password and pin) twice as it creates/validates the pre-requisite directory structure as setup in your home directory.
  
- Once completed, visit:

  https://vdi.rc.fas.harvard.edu

  and go through the same Validation process as for the development environment.

## Support ticket attachments
There are restrictions in place for the attachments. There is client side validation:
 * Attachment files cannot be bigger than 5MB
 * Number of attachment files cannot be bigger than 5
 * To update: [application/app/assets/javascripts/support_ticket.js#L6](application/app/assets/javascripts/support_ticket.js#L6)

And there is back-end validation:
 * Attachment files cannot be bigger than 6MB
 * Number of attachment files cannot be bigger than 8
 * To update: [application/app/models/attachments_validator.rb#L7](application/app/models/attachments_validator.rb#L7)

## RT server configuration

RT is deployed locally using a Docker image. The version of RT is controlled by the version of the Docker image. The versions supported can be found: [https://hub.docker.com/r/netsandbox/request-tracker/](https://hub.docker.com/r/netsandbox/request-tracker/)  
To upgrade the RT version, simple update the version in the Docker compose file: [docker-compose.yml](docker-compose.yml)

```
services:
  rt:
    image: netsandbox/request-tracker:4.4
```
Configuration file: `config/rt_config.yml`, eg:
```
server: "https://rt.iqss.com"
user: "test"
pass: "password"
auth_token:
timeout: 99
verify_ssl: true
priority: "4"
queue_name: "General"
```

Configuration environment variables:

```
RT_SERVER: URL for the RT server, eg: https://rt.iqss.com.
RT_USER: API username.
RT_PASSWORD: API password.
RT_AUTH_TOKEN: API auth token, use instead of username and password.
RT_TIMEOUT: Connection and read timeout in seconds. Defaults to 30
RT_VERIFY_SSL: Whether or not the client should validate SSL certificates. Defaults to false
RT_QUEUE: The name of the queue where tickets will be added to. Defaults to General
RT_PRIORITY: The priority for the ticket. Defaults to 4
```
### RT configuration for remote-dev
To test the support ticket creation in `remote-dev`, we need to configure the RT client. We need to manually add the RT configuration before executing the `remote-dev` deployment.  
Create the configuration file `config/rt_config.yml` with the following contents below.  
username and password are available in Lastpass
```
server: "https://help.hmdc.harvard.edu"
user: "username"
pass: "password"
queue_name: "IQSS_FASRC_support"
```

## Launcher button configuration

To add or update launcher buttons, follow the instructions [here](launchers.md)

## Quick links configuration

To add or update quick link buttons, follow the instructions [here](quick_links.md)

