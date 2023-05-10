# default build target
all:: local
.PHONY: sid test ondemand ondemand-test landing

DOCKER_NODE_IMAGE := node:16
DOCKER_CYPRESS_IMAGE := cypress/base:16.4.0
WORKING_DIR := $(shell pwd)
FASSE_ENV := env no_proxy=.harvard.edu http_proxy=http://rcproxy.rc.fas.harvard.edu:3128 https_proxy=http://rcproxy.rc.fas.harvard.edu:3128

# Add FASSE proxy when running against FASSE environment.
ifeq "$(CONFIG)" "remote-fasse"
    ENV:=$(FASSE_ENV)
endif
ifeq "$(CONFIG)" "staging-fasse"
    ENV:=$(FASSE_ENV)
endif
ifeq "$(CONFIG)" "prod-fasse"
    ENV:=$(FASSE_ENV)
endif

sid:
	@echo "For FASSE and Cannon environments, you need to be connected to the VPN"
	cp -rf ./sid/cypress.env.json.$(CONFIG) cypress.env.json
	$(ENV) npm install && $(ENV) ./node_modules/.bin/cypress run --headless --spec cypress/integration/fasrc-dashboard/*,cypress/integration/sid-dashboard/*

test:
	cd ../dashboard/ && DETACHED=true make
	docker pull $(DOCKER_CYPRESS_IMAGE)
	./wait_for_dashboard.sh
	cp -rf ./sid/cypress.env.json.local cypress.env.json
	docker run --rm --network=host -v $(WORKING_DIR):/usr/local/app -v /usr/local/app/node_modules -w /usr/local/app --env cypress_dashboard_username=$$OOD_USERNAME --env cypress_dashboard_password=$$OOD_PASSWORD $(DOCKER_CYPRESS_IMAGE) /bin/bash -c "npm install && ./node_modules/.bin/cypress run --headless --spec cypress/integration/fasrc-dashboard/*,cypress/integration/sid-dashboard/*" || :
	cd ../dashboard/ && make down

ondemand:
	cp -rf ./ondemand/cypress.env.json.$(CONFIG) cypress.env.json
	$(ENV) npm install && $(ENV) ./node_modules/.bin/cypress run --headless --spec "cypress/integration/ondemand/**/*.spec.js"

ondemand-test:
	cd ../ondemand/ && DETACHED=true make
	docker pull $(DOCKER_CYPRESS_IMAGE)
	env ENDPOINT=https://localhost:33000/pun/sys/dashboard ./wait_for_dashboard.sh
	cp -rf ./ondemand/cypress.env.json.local cypress.env.json
	docker run --rm --network=host -v $(WORKING_DIR):/usr/local/app -v /usr/local/app/node_modules -w /usr/local/app --env cypress_dashboard_username=$$OOD_USERNAME --env cypress_dashboard_password=$$OOD_PASSWORD $(DOCKER_CYPRESS_IMAGE) /bin/bash -c 'npm install && ./node_modules/.bin/cypress run --headless --spec "cypress/integration/ondemand/**/*.spec.js"' || :
	cd ../ondemand/ && make down

landing:
	cp -rf landing/cypress.env.json.landing cypress.env.json
	$(ENV) npm install && $(ENV) ./node_modules/.bin/cypress run --headless --spec cypress/integration/sid-landing-site/*