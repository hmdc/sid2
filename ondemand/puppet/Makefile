# default build target
all::

all:: up
.PHONY: up down network slurm puppet ssh docker_build docker_build_ood

OOD_UID := $(shell id -u)
OOD_GID := $(shell id -g)
SLURM_TAG := slurm-21-08-6-1
SID_SLURM_IMAGE := hmdc/sid-slurm:$(SLURM_TAG)

ENV := env SLURM_TAG=$(SLURM_TAG) SID_SLURM_IMAGE=$(SID_SLURM_IMAGE) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID)

PWD := $(shell pwd)

slurm:
	$(ENV) docker-compose up --build

up:
	cp -r ../ondemand.d ./files
	cp -r ../public ./files
	cp -r ../lib ./files
	cp -r ../apps ./files
	cp -r ../development/RstudioDev ./files/apps
	cp -r ../application ./files
	cp -r ../apache ./files

	docker run --rm --hostname localhost --name ood_puppet --privileged -v $(PWD)/../data/:/home/ood/ondemand/data -v puppet_ood_dashboard:/var/www/ood/apps/sys/dashboard -v /sys/fs/cgroup:/sys/fs/cgroup:rw -v $(PWD)/files:/tmp/dashboard/files -v $(PWD)/data:/etc/puppetlabs/code/environments/production/data -v $(PWD)/manifests:/etc/puppetlabs/code/environments/production/manifests --cgroupns=host -p 33000:443 -it ood_puppet:8

network:
	docker network connect puppet_default ood_puppet
	-docker exec -it --user ood ood_puppet ssh-keygen -t rsa -N '' -f /home/ood/.ssh/id_rsa
	-docker exec -it --user ood ood_puppet /bin/bash -c "sshpass -p ood ssh-copy-id -o StrictHostKeyChecking=no -i /home/ood/.ssh/id_rsa.pub ood@slurmctld"

down:
	docker rm -f ood_puppet
	$(ENV) docker-compose down -v || :

puppet:
	docker exec -it ood_puppet /opt/puppetlabs/bin/puppet agent -t || :

ssh:
	docker exec -it ood_puppet /bin/bash || :

docker_build:
	docker build -t rocky_systemd:8 -f Dockerfile.systemd .
	docker build -t ood_puppet:8 -f Dockerfile.puppet .

docker_build_ood:
	docker build -t ood_puppet:8 -f Dockerfile.puppet .