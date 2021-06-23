# Sid2

## Launching the Sid Dashboard development environment

The following will launch a Sid Dashboard development environment with:

- Slurmctld - Slurm master,
- Slurmdbd - Slurm database
- C1, C2 - Slurm execute nodes.
- OOD - OpenOnDemand node with Sid2 installed as as a [development-mode](https://osc.github.io/ood-documentation/master/app-development/enabling-development-mode.html) app.

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

- Run `make` from checkout. The build process is finished when the `ood_1` container stops generating output, and the `slurmctld` container goes into an output loop.
- The entire directory/checkout is mapped into the OOD and slurm containers. Changes made to code will immediately reflect within OOD (with the exception of CSS/JS changes which requires a rake, see Caveats.)

### Connecting

- After the containers have started, connect to [http://localhost:33000](http://localhost:33000)
- Login with username `ood`, password `ood`.

### Validation

- Can you run and connect to RStudio through the original OpenOnDemand dashboard?
- Is the Develop menu on the top-bar visible?
- Can you get into the Develop menu, select My SandBox Apps, and launch the Sid2 Ood Dashboard?
- Does OOD prompt you to "initialize" the app after launching Sid2 from the developer menu? (It should..)
- After application is initialized, does it show Sid2? Note that at this point Sid2 does not function properly as @adaybujeda is re-writing the frontend code and API routes. Proving that the dev environment works only requires that you can at least initialize the app and install its libraries.

### Stopping

- Run `make down`

## Deploying to QA (your FASRC account)

- Run `make qa`. `make qa` builds all required OOD/Ruby libs locally and exports built artifacts to FASRC. This task will prompt you for your FASRC SSH credentials (password and pin) twice as it creates/validates the pre-requisite directory structure as setup in your home directory.
  
- Once completed, visit:

  https://vdi.rc.fas.harvard.edu

  and go through the same Validation process as for the development environment.

## Launcher button configuration

To add or update launcher buttons, follow the instructions [here](launchers.md)

## Quick links configuration

To add or update quick link buttons, follow the instructions [here](quick_links.md)

