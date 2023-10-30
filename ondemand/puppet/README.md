# OnDemand 3.x (Rocky8) + Slurm 21-08-6-1 (CentOS 7)

## Build and Run
The Docker environment uses the existing Slurm Cluster built for OnDemandv3.x (with CentOS7): hmdc/sid-slurm:v3-slurm-21-08-6-1. 
This image has already been built and is available in the DockerHub: https://hub.docker.com/r/hmdc/sid-slurm/tags 

Build the OnDemand Docker image with Rockylinux:8 and Puppet7. All these commands run on the working directory `ondemand/puppet`.
```
cd ondemand/puppet
make docker_build
```

Start the Slurm cluster and the puppet environment:
```
# This command will stay open with the output from the Slurm cluster
make
```

Unfortunely the OnDemand Docker image does not print any messages on the console as part of the docker compose start up script. 
So we need to wait around 20 seconds for the puppetserver service to fully start up.

At this point, we have a running Slurm cluster and a Puppet7 server. We need to run puppet to install OnDemand and the FASRC and Sid profiles. 
Run puppet agent to install and configure Open OnDemand
```
make puppet
```

Load the OnDemand interface in a browser:
https://localhost:33000/

Use the standard user credentials:
```
username: ood
pwd: ood
```

### Stop the environment
Once started, the OnDemand environment will be showing the container logs in the terminal.

To stop the environment, press ctrl+c


## OnDemand Configuration and Applications
The OnDemand dashboard is configured with 2 profiles. One with the look and feel and applications of FASRC, and the second one with the look and feel and applications for Sid. This is based on the application configuration for the production Cannon environment. These applications will not work in the local environment.

To test the local environment, 2 development applications have been installed, but hidden from the navigation menus:
 - Rstudio - https://localhost:33000/pun/sys/dashboard/batch_connect/sys/RstudioDev/session_contexts/new
 - Remote Desktop - https://localhost:33000/pun/sys/dashboard/batch_connect/sys/rdesktop/session_contexts/new


## Puppet Configuration Files
The main puppet manifest is `manifests/site.pp`. This contains the puppet default node configuration for the local environment.

The `data/common.yaml` contains the OnDemand Puppet Module configuration.

The puppet manifest and module configuration uses the following folders from the parent `ondemand` project:

 - ../apache
 - ../application
 - ../apps
 - ../development
 - ../lib
 - ../ondemand.d
 - ../public

## Useful Commands
 * make ssh
 * puppet agent -t
 * puppet lookup openondemand::clusters --environment production --explain
 * facter

