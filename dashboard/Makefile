# default build target
all::

all:: dev
.PHONY: dev

OOD_UID := $(shell id -u)
OOD_GID := $(shell id -g)
FASRC_USERNAME := $(if $(SSH_USERNAME),$(SSH_USERNAME),$(USER))
FASRC_LOGIN_HOST := login.rc.fas.harvard.edu

dev:

	env SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down -v || :
	env SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose up --build

qa:
	ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST) mkdir -p ./fasrc/dev/dashboard || :
	rsync -avz --exclude-from='rsync-exclude.conf' . -e ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST):./fasrc/dev/dashboard

down:

	env SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down -v || :

up:

	env SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose up --build

 
