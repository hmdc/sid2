# default build target
all::

all:: dev
.PHONY: dev remote-dev remote-fasse test release down up clean clean-remote-dev clean-remote-fasse version next-version docker-build docker-build-slurm docker-build-ood docker-push

OOD_UID := $(shell id -u)
OOD_GID := $(shell id -g)
OOD_TAG := 2.0.16-1.el7
SLURM_TAG := slurm-21-08-6-1
REMOTE_USERNAME := $(if $(SSH_USERNAME),$(SSH_USERNAME),$(USER))
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

dev: version down up

remote-dev remote-fasse: version
	$(ENV) http_proxy=$(HTTP_PROXY) https_proxy=$(HTTPS_PROXY) docker-compose build
	@echo "You need to be connected to the VPN"
	ssh $(REMOTE_USERNAME)@$(LOGIN_HOST) mkdir -p $(APP_FOLDER)
	$(ENV) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake assets:precompile'"
	@echo "You need to be connected to the VPN"
	@./download_and_check.sh $(REMOTE_USERNAME) $(TEMPLATE_URL)/$(TURBOVNC_TEMPLATE) $(TEMPLATE_LOCATION)/$(TURBOVNC_TEMPLATE) $(CHECK_TEMPLATE_VERSION)
	@./download_and_check.sh $(REMOTE_USERNAME) $(TEMPLATE_URL)/$(KVM_TEMPLATE) $(TEMPLATE_LOCATION)/$(KVM_TEMPLATE) $(CHECK_TEMPLATE_VERSION)
	rsync -avz --delete --exclude-from='rsync-exclude.conf' ./application/ -e ssh $(REMOTE_USERNAME)@$(LOGIN_HOST):$(APP_FOLDER)

test:
	$(ENV) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake test'"

release: next-version
	$(ENV) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; export RAILS_ENV=production; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake assets:precompile'"
	mkdir -p ./target
	tar -czvf ./target/sid2-dashboard.tar.gz ./application

down:
	$(ENV) docker-compose down -v || :

up:
	$(ENV) docker-compose up --build $(DETACHED_MODE)

clean:
	rm -rf application/.bundle application/VERSION application/log application/node_modules application/public/assets application/tmp application/vendor/bundle data/*
	$(ENV) docker-compose down --rmi all --volumes

clean-remote-dev clean-remote-fasse:
	echo "For FASSE, you need to be connected to the VPN"
	ssh $(REMOTE_USERNAME)@$(LOGIN_HOST) rm -rfv $(APP_FOLDER) || :

version:
	cp ../VERSION application/VERSION

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
