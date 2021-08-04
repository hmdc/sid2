# default build target
all::

all:: dev
.PHONY: build dev reset

WORKING_DIR := $(shell pwd)
BUILD_COMMAND := mvn -Dmaven.repo.local=maven-local-repo clean && mvn -Dmaven.repo.local=maven-local-repo package
TEST_COMMAND := mvn -Dmaven.repo.local=maven-local-repo clean && mvn -Dmaven.repo.local=maven-local-repo test

build:
	docker run -it --rm -v $(WORKING_DIR):/usr/local/app -w /usr/local/app maven:3-openjdk-11 /bin/bash -c "$(BUILD_COMMAND)"

dev:
	docker run -it --rm -v $(WORKING_DIR):/usr/local/app -w /usr/local/app maven:3-openjdk-11 /bin/bash -c "$(BUILD_COMMAND)"
	docker-compose up --build

reset:
	docker run -it --rm -v $(WORKING_DIR):/usr/local/app -w /usr/local/app maven:3-openjdk-11 /bin/bash -c "$(BUILD_COMMAND)"
	docker-compose down -v || :
	docker-compose up --build

ci:
	docker run -it --rm -v $(WORKING_DIR):/usr/local/app -w /usr/local/app maven:3-openjdk-11 /bin/bash -c "$(TEST_COMMAND)"