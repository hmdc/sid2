# default build target
all::

all:: dev
.PHONY: dev

OOD_UID := $(shell id -u)
OOD_GID := $(shell id -g)

dev:

	env SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down -v || :
	env SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose up --build
 
