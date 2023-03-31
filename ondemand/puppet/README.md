# OnDemand 3.0.0 + Puppet

## Build and Run
Build Docker image with Rockylinux:8 and Puppet7
```
cd ondemand/puppet
make docker_build
```

Start the Docker image running the puppet server:
```
make
```
Wait until the puppet server starts
```
[  OK  ] Started puppetserver Service.
```

Run puppet agent to install and configure Open OnDemand
```
cd ondemand/puppet
make puppet
```

Connect to the running container 
```
cd ondemand/puppet
make ssh
```

Load the OnDemand interface in a browser:
http://localhost:33000/

Use the standard user credentials:
```
username: ood
pwd: ood
```

## Stop the running container
```
cd ondemand/puppet
make down
```

### Useful Commands
 * puppet agent -t
 * puppet lookup openondemand::clusters --environment production --explain
 * facter

