# default build target
all::

all:: up
.PHONY: up down puppet ssh docker_build docker_build_ood

OOD_UID := $(shell id -u)
OOD_GID := $(shell id -g)
SLURM_TAG := slurm-21-08-6-1
SID_SLURM_IMAGE := hmdc/sid-slurm:v3-$(SLURM_TAG)

ENV := env SLURM_TAG=$(SLURM_TAG) SID_SLURM_IMAGE=$(SID_SLURM_IMAGE) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID)

PWD := $(shell pwd)

up: down
	$(ENV) docker-compose up --build

down:
	$(ENV) docker-compose down -v || :

puppet:
	docker exec -it puppet_ood /opt/puppetlabs/bin/puppet agent -t || :

ssh:
	docker exec -it puppet_ood /bin/bash || :

docker-build:
	docker build -t rocky_systemd:8 -f Dockerfile.systemd .
	docker build -t ood_puppet:8 -f Dockerfile.puppet .

docker-build-ood:
	docker build -t ood_puppet:8 -f Dockerfile.puppet .