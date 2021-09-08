# default build target
all::

all:: dev
.PHONY: dev

OOD_UID := $(shell id -u)
OOD_GID := $(shell id -g)
OOD_TAG := 2.0.13-1.el7
SLURM_TAG := slurm-20-11-4-1
FASRC_USERNAME := $(if $(SSH_USERNAME),$(SSH_USERNAME),$(USER))
FASRC_LOGIN_HOST := login.rc.fas.harvard.edu

dev:

	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down -v || :
	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose up --build

remote-dev:
	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose build
	ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST) mkdir -p ./fasrc/dev/dashboard || :
	SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake assets:precompile'"
	rsync -avz --exclude-from='rsync-exclude.conf' ./application/ -e ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST):./fasrc/dev/dashboard

test:

	SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake test'"

release:

	SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose run --no-deps --entrypoint="" ood su - ood bash -c "export PATH=/home/ood/bin:/home/ood/ondemand/dev/dashboard/node_modules/.bin:$$PATH; export RAILS_ENV=production; cd /home/ood/ondemand/dev/dashboard; scl enable rh-ruby27 rh-nodejs12 'gem install --user-install bundler -v 2.1.4 && bundle config --local path 'vendor/bundle' && bundle install && npm install yarn --save && bundle exec rake assets:precompile'"
	mkdir -p ./target
	tar -czvf ./target/sid2-dashboard.tar.gz ./application

down:

	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down -v || :

up:

	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose up --build

clean:

	env SLURM_TAG=$(SLURM_TAG) OOD_TAG=$(OOD_TAG) OOD_UID=$(OOD_UID) OOD_GID=$(OOD_GID) docker-compose down --rmi all

clean-remote-dev:
	ssh $(FASRC_USERNAME)@$(FASRC_LOGIN_HOST) rm -rfv ./fasrc/dev/dashboard || :
