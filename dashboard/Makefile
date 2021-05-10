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
	SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby25 rh-nodejs10 'gem install --user-install bundler -v 1.17.3 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake assets:precompile'"
	rsync -avz --exclude-from='rsync-exclude.conf' ./application/ -e ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST):./fasrc/dev/dashboard

release:

	rm -rf ./deployment/sid_passenger/files/application
	SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; export RAILS_ENV=production; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby25 rh-nodejs10 'gem install --user-install bundler -v 1.17.3 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake assets:precompile'"
	cp -r ./application ./deployment/sid_passenger/files/application

down:

	env SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down -v || :

up:

	env SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose up --build

clean:

	env SLURM_TAG=slurm-20-11-4-1 OOD_TAG=1.8-1 OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down --rmi all

clean_qa:
	ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST) rm -rfv ./fasrc/dev/dashboard || :
