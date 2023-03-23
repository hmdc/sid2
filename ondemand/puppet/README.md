# OnDemand 3.0.0 + Puppet

## Build and Run
Build Docker image with Rockylinux:8 and Puppet7
```
cd ondemand/puppet
docker build -t ondemand-puppet -f Dockerfile.puppet .
```

Start the Docker image running the puppet server:
```
docker-compose up --build
```

Connect to the running container and run puppet agent.
Allow enough time for the puppet server to fully start:
```
docker exec -it ondemand_puppet /bin/bash
puppet agent -t
```

You need to run the puppet agent 3 times to generate all files. At the moment I am not sure why this is.
The final run should look like the following:

```
[root@localhost /]# puppet agent -t
Info: Using environment 'production'
Info: Retrieving pluginfacts
Info: Retrieving plugin
Info: Loading facts
Info: Caching catalog for localhost
Info: Applying configuration version '1679588308'
Error: Services must specify a start command or a binary
Error: /Stage[main]/Systemd::Journald/Service[systemd-journald]/ensure: change from 'stopped' to 'running' failed: Services must specify a start command or a binary
Error: Services must specify a start command or a binary
Error: /Stage[main]/Apache::Service/Service[httpd]/ensure: change from 'stopped' to 'running' failed: Services must specify a start command or a binary
Notice: Applied catalog in 2.93 seconds
```

Start Apache web server:
```
httpd -k start
```

Load the OnDemand interface in a browser:
http://localhost:33000/

