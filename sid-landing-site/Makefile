# default build target
all::

all:: dev
.PHONY: dev ci_build ci_test

DOCKER_NODE_IMAGE := node:$(shell cat ../.node-version)
WORKING_DIR := $(shell pwd)
BUILD_COMMAND := npm install && npm run build
TEST_COMMAND := npm install && npm run test:ci

dev:
	npm install
	npm start

ci:
	docker run --rm -v $(WORKING_DIR):/usr/local/app -v /usr/local/app/node_modules -w /usr/local/app ${DOCKER_NODE_IMAGE} /bin/bash -c "$(TEST_COMMAND)"

release:
	docker run --rm -v $(WORKING_DIR):/usr/local/app -v /usr/local/app/node_modules -w /usr/local/app ${DOCKER_NODE_IMAGE} /bin/bash -c "$(BUILD_COMMAND)"
	mkdir -p ./target
	tar -czvf ./target/sid2-landing-site.tar.gz -C build .

docker:
	docker build --build-arg NodeVersion=${DOCKER_NODE_IMAGE} -t sid-landing-site:latest .
	docker run -it --rm -p 3000:80 sid-landing-site