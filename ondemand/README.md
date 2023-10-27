# OnDemand 3.x + Slurm 21-08-6-1 + CentOS 7

## Build and Run
The Docker environment uses an updated version of the Slurm Cluster built for Sid (with CentOS7): hmdc/sid-slurm:v3-slurm-21-08-6-1. 
And the new OnDemand Docker image configured for OOD version 3.0.1: hmdc/sid-ood:v3-slurm-21-08-6-1-ood-3.0.1-1.el7
These images have already been built and pushed to DockerHub:
 - https://hub.docker.com/r/hmdc/sid-slurm/tags
 - https://hub.docker.com/r/hmdc/sid-ood/tags


To build the Slurm cluster and the new OnDemand 3.0.1 images execute the following command. All these commands run on the working directory `ondemand`
```
cd ondemand
make docker-build
```

If you have already built the Slurm cluster images and only the new OnDemand 3.0.1 image is needed, execute:
```
cd ondemand
make docker-build-ood
```

To run the Slurm cluster and start the OnDemand dashboard:
```
cd ondemand
make
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


## OnDemand Configuration Files
To configure OnDemand with the FASRC and Sid profiles and features, the following folders are mounted into the OnDemand image:
 - announcements.d
 - apache
 - application
 - apps
 - development
 - lib
 - ondemand.d
 - public

