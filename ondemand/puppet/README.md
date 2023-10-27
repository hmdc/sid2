# OnDemand 3.x (Rocky8) + Slurm 21-08-6-1 (CentOS 7)

## Build and Run
The Docker environment uses the existing Slurm Cluster built for Sid (with CentOS7): hmdc/sid-slurm:slurm-21-08-6-1. No need to rebuild.

Build the OnDemand Docker image with Rockylinux:8 and Puppet7. All these commands run on the working directory `ondemand/puppet`.
```
cd ondemand/puppet
make docker_build
```

Start the Slurm cluster:
```
# This command will stay open with the output from the Slurm cluster
make slurm
```
Start the puppet server:
```
# This command will stay open
make
```

Wait until the puppet server starts
```
[  OK  ] Started puppetserver Service.
```

Attach the new container to the Slurm cluster and add SSH keys for the ood user
```
make network
```

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

## Stop the environment
```
cd ondemand/puppet
make down
```

### Useful Commands
 * make ssh
 * puppet agent -t
 * puppet lookup openondemand::clusters --environment production --explain
 * facter

