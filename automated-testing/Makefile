# default build target
all:: local
.PHONY: test local remote-dev remote-fasse staging-cannon staging-fasse prod-cannon prod-fasse landing

DOCKER_NODE_IMAGE := node:16
DOCKER_CYPRESS_IMAGE := cypress/base:16.4.0
WORKING_DIR := $(shell pwd)

remote-fasse staging-fasse prod-fasse:  ENV := env no_proxy=.harvard.edu http_proxy=http://rcproxy.rc.fas.harvard.edu:3128 https_proxy=http://rcproxy.rc.fas.harvard.edu:3128

local remote-dev remote-fasse staging-fasse prod-fasse staging-cannon prod-cannon:
	@echo "For FASSE and Cannon environments, you need to be connected to the VPN"
	cp -rf cypress.env.json.$(@) cypress.env.json
	$(ENV) npm install && $(ENV) ./node_modules/.bin/cypress run --headless --spec cypress/integration/fasrc-dashboard/*,cypress/integration/sid-dashboard/*

test:
	cd ../dashboard/ && DETACHED=true make
	docker pull $(DOCKER_CYPRESS_IMAGE)
	./wait_for_dashboard.sh
	cp -rf cypress.env.json.local cypress.env.json
	docker run --rm --network=host -v $(WORKING_DIR):/usr/local/app -v /usr/local/app/node_modules -w /usr/local/app --env cypress_dashboard_username=$$OOD_USERNAME --env cypress_dashboard_password=$$OOD_PASSWORD $(DOCKER_CYPRESS_IMAGE) /bin/bash -c "npm install && ./node_modules/.bin/cypress run --headless --spec cypress/integration/fasrc-dashboard/*,cypress/integration/sid-dashboard/*" || :
	cd ../dashboard/ && make down

landing:
	cp -rf cypress.env.json.$(@) cypress.env.json
	$(ENV) npm install && $(ENV) ./node_modules/.bin/cypress run --headless --spec cypress/integration/sid-landing-site/*