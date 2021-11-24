# default build target
all::

all:: dev
.PHONY: dev remote-dev test release down up clean clean-remote-dev version next-version docker-build docker-push

OOD_UID := $(shell id -u)
OOD_GID := $(shell id -g)
OOD_TAG := 2.0.16-1.el7
SLURM_TAG := slurm-21-08-2-1
SID_SLURM_IMAGE := hmdc/sid-slurm:$(SLURM_TAG)
SID_ONDEMAND_IMAGE := hmdc/sid-ood:$(SLURM_TAG)-ood-$(OOD_TAG)
FASRC_USERNAME := $(if $(SSH_USERNAME),$(SSH_USERNAME),$(USER))
FASRC_LOGIN_HOST := login.rc.fas.harvard.edu

ENV := env SLURM_TAG=$(SLURM_TAG) SID_SLURM_IMAGE=$(SID_SLURM_IMAGE) SID_ONDEMAND_IMAGE=$(SID_ONDEMAND_IMAGE) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) 

DETACHED_MODE := $(if $(DETACHED),-d,)

NODE_VERSION :=`cat ../.node-version`
PWD := $(shell pwd)

dev: version down up

remote-dev: version
	$(ENV) docker-compose build
	ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST) mkdir -p ./fasrc/dev/dashboard || :
	$(ENV) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake assets:precompile'"
	rsync -avz --exclude-from='rsync-exclude.conf' ./application/ -e ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST):./fasrc/dev/dashboard

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
	$(ENV) docker-compose down --rmi all

clean-remote-dev:
	ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST) rm -rfv ./fasrc/dev/dashboard || :

version:
	cp ../VERSION application/VERSION

next-version:
	docker run --rm -v $(PWD)/..:/usr/app -w /usr/app node:$(NODE_VERSION) /bin/bash -c "npm install && npm run version | tail -n 1 > dashboard/application/VERSION"

docker-build:
	docker build --build-arg SLURM_TAG=$(SLURM_TAG) -t $(SID_SLURM_IMAGE) -f docker/Dockerfile.slurm .
	docker build --build-arg OOD_TAG=$(OOD_TAG) --build-arg SLURM_TAG=$(SLURM_TAG) -t $(SID_ONDEMAND_IMAGE) -f docker/Dockerfile.ondemand .

docker-push:
	docker login
	docker push $(SID_SLURM_IMAGE)
	docker push $(SID_ONDEMAND_IMAGE)