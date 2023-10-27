# OnDemand 3.x + Slurm 21-08-6-1 + CentOS 7

## Build and Run
Build the Slurm cluster and the new OnDemand 3.0.1 images. All these commands run on the working directory `ondemand`
```
cd ondemand
make docker-build
```

If you have already built the Slurm cluster images and only the new OnDemand 3.0.1 image is needed, execute:
```
cd ondemand
make docker-build-ood
```

Start the Slurm cluster and OnDemand:
```
make
```

Load the OnDemand interface in a browser:
https://localhost:33000/

Use the standard user credentials:
```
username: ood
pwd: ood
```

## Stop the environment
Once started, the OnDemand environment will be showing the container logs in the terminal.

To stop the environment, press ctrl+c

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

