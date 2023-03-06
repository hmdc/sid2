# default build target
all::

all:: dev
.PHONY: dev release down up clean version next-version docker-build docker-build-slurm docker-build-ood docker-push

OOD_UID := $(shell id -u)
OOD_GID := $(shell id -g)
OOD_TAG := 2.1.0-0.rc9.el7
SLURM_TAG := slurm-21-08-6-1
SID_SLURM_IMAGE := hmdc/sid-slurm:$(SLURM_TAG)
SID_ONDEMAND_IMAGE := hmdc/sid-ood:$(SLURM_TAG)-ood-$(OOD_TAG)

ENV := env SLURM_TAG=$(SLURM_TAG) SID_SLURM_IMAGE=$(SID_SLURM_IMAGE) SID_ONDEMAND_IMAGE=$(SID_ONDEMAND_IMAGE) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID)

DETACHED_MODE := $(if $(DETACHED),-d,)

NODE_VERSION :=`cat ../.node-version`
PWD := $(shell pwd)

ifneq ($(shell git branch --show-current),stable)
NPM_RUN_VERSION_ARGS := --config='.release-it-dev.json'
endif

TEMPLATE_LOCATION := ./application/lib/ood_core/batch_connect/templates
TURBOVNC_TEMPLATE := turbovnc.rb
KVM_TEMPLATE      := kvm.rb

remote-dev clean-remote-dev:     LOGIN_HOST   := login.rc.fas.harvard.edu
remote-dev clean-remote-dev:     APP_FOLDER   := ./fasrc/dev/dashboard
remote-dev:                      TEMPLATE_URL := https://iqss-sid.rc.fas.harvard.edu/pun/sys/dashboard/files/fs/var/www/ood/apps/sys/sid/lib/ood_core/batch_connect/templates
remote-dev:                      CHECK_TEMPLATE_VERSION  := "check_version"

remote-fasse clean-remote-fasse: LOGIN_HOST   := fasselogin.rc.fas.harvard.edu
remote-fasse clean-remote-fasse: APP_FOLDER   := ./.fasseood/dev/dashboard
remote-fasse:                    TEMPLATE_URL := https://fasse-iqss-ood.rc.fas.harvard.edu/pun/sys/dashboard/files/fs/var/www/ood/apps/sys/sid/lib/ood_core/batch_connect/templates
remote-fasse:                    HTTP_PROXY   := http://rcproxy.rc.fas.harvard.edu:3128
remote-fasse:                    HTTPS_PROXY  := http://rcproxy.rc.fas.harvard.edu:3128
remote-fasse:                    CHECK_TEMPLATE_VERSION  := ""

dev: down up

release: next-version
	mkdir -p ./target
	tar -czvf ./target/ondemand-dashboard.tar.gz ./application

down:
	$(ENV) docker-compose down -v || :

up:
	$(ENV) docker-compose up --build $(DETACHED_MODE)

clean:
	$(ENV) docker-compose down --rmi all --volumes

next-version:
	docker run --rm -v $(PWD)/..:/usr/app -w /usr/app node:$(NODE_VERSION) /bin/bash -c "npm install && npm run version -- $(NPM_RUN_VERSION_ARGS) | tail -n 1 > dashboard/application/VERSION"

docker-build: docker-build-slurm docker-build-ood

docker-push:
	docker push $(SID_SLURM_IMAGE)
	docker push $(SID_ONDEMAND_IMAGE)

docker-build-slurm:
	docker build --build-arg SLURM_TAG=$(SLURM_TAG) -t $(SID_SLURM_IMAGE) -f docker/Dockerfile.slurm .

docker-build-ood:
	docker build --build-arg OOD_TAG=$(OOD_TAG) --build-arg SLURM_TAG=$(SLURM_TAG) -t $(SID_ONDEMAND_IMAGE) -f docker/Dockerfile.ondemand .

docker-push-ood:
	docker push $(SID_ONDEMAND_IMAGE)
