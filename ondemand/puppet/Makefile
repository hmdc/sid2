# default build target
all::

all:: up
.PHONY: up down puppet ssh docker_build docker_build_ood

PWD := $(shell pwd)

up:
	cp -r ../ondemand.d ./files
	cp -r ../public ./files
	cp -r ../lib ./files
	cp -r ../apps ./files
	cp -r ../application ./files

	docker run --rm --hostname localhost --name ood_puppet --privileged -v /sys/fs/cgroup:/sys/fs/cgroup:rw -v $(PWD)/files:/tmp/dashboard/files -v $(PWD)/data:/etc/puppetlabs/code/environments/production/data -v $(PWD)/manifests:/etc/puppetlabs/code/environments/production/manifests --cgroupns=host -p 33000:80 -it ood_puppet:8

down:
	docker rm -f ood_puppet

puppet:
	-docker exec -it ood_puppet /opt/puppetlabs/bin/puppet agent -t

ssh:
	-docker exec -it ood_puppet /bin/bash

docker_build:
	docker build -t rocky_systemd:8 -f Dockerfile.systemd .
	docker build -t ood_puppet:8 -f Dockerfile.puppet .

docker_build_ood:
	docker build -t ood_puppet:8 -f Dockerfile.puppet .