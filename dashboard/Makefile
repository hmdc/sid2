# default build target
all::

all:: dev
.PHONY: dev remote-dev remote-fasse test release down up clean-remote-dev clean-remote-fasse version

OOD_UID := $(shell id -u)
OOD_GID := $(shell id -g)
OOD_TAG := 2.0.13-1.el7
SLURM_TAG := slurm-20-11-4-1
REMOTE_USERNAME := $(if $(SSH_USERNAME),$(SSH_USERNAME),$(USER))

NODE_VERSION=`cat ../.node-version`
PWD = $(shell pwd)

remote-dev clean-remote-dev:     LOGIN_HOST := login.rc.fas.harvard.edu
remote-dev clean-remote-dev:     APP_FOLDER   := ./fasrc/dev/dashboard
remote-fasse clean-remote-fasse: LOGIN_HOST := fasselogin.rc.fas.harvard.edu
remote-fasse clean-remote-fasse: APP_FOLDER   := ./.fasseood/dev/dashboard

dev: version
	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down -v || :
	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose up --build

remote-dev remote-fasse: version
	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose build
	echo "For FASSE, you need to be connected to the VPN"
	ssh $(REMOTE_USERNAME)@$(LOGIN_HOST) mkdir -p $(APP_FOLDER)
	SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake assets:precompile'"
	rsync -avz --delete --exclude-from='rsync-exclude.conf' ./application/ -e ssh $(REMOTE_USERNAME)@$(LOGIN_HOST):$(APP_FOLDER)

test:
	SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake test'"

release: next-version
	SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; export RAILS_ENV=production; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake assets:precompile'"
	mkdir -p ./target
	tar -czvf ./target/sid2-dashboard.tar.gz ./application

down:
	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down -v || :

up:
	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose up --build

clean:
	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down --rmi all

clean-remote-dev clean-remote-fasse:
	echo "For FASSE, you need to be connected to the VPN"
	ssh $(REMOTE_USERNAME)@$(LOGIN_HOST) rm -rfv $(APP_FOLDER) || :

version:
	cp ../VERSION application/VERSION

next-version:
	docker run --rm -v $(PWD)/..:/usr/app -w /usr/app node:$(NODE_VERSION) /bin/bash -c "npm install && npm run version | tail -n 1 > dashboard/application/VERSION"
