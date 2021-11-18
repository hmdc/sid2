# default build target
all:: local
.PHONY: test local remotedev staging-cannon prod-fasse prod-cannon

DOCKER_NODE_IMAGE := node:16
DOCKER_CYPRESS_IMAGE := cypress/base:16.4.0
WORKING_DIR := $(shell pwd)

local remotedev staging-cannon prod-fasse prod-cannon:
	cp -rf cypress.env.json.$(@) cypress.env.json
	docker run --rm --network=host -v $(WORKING_DIR):/usr/local/app -v /usr/local/app/node_modules -w /usr/local/app --env cypress_dashboard_username=$$OOD_USERNAME --env cypress_dashboard_password=$$OOD_PASSWORD $(DOCKER_CYPRESS_IMAGE) /bin/bash -c "npm install && ./node_modules/.bin/cypress run --headless"

test:
	cd ../dashboard/ && DETACHED=true make
	./wait_for_dashboard.sh
	cp -rf cypress.env.json.local cypress.env.json
	docker run --rm --network=host -v $(WORKING_DIR):/usr/local/app -v /usr/local/app/node_modules -w /usr/local/app --env cypress_dashboard_username=$$OOD_USERNAME --env cypress_dashboard_password=$$OOD_PASSWORD $(DOCKER_CYPRESS_IMAGE) /bin/bash -c "npm install && ./node_modules/.bin/cypress run --headless" || :
	cd ../dashboard/ && make down