# default build target
all::

all:: dev
.PHONY: build dev reset

WORKING_DIR := $(shell pwd)

build:
	docker run -it --rm -v $(WORKING_DIR):/usr/local/app -w /usr/local/app maven:3-openjdk-11 /bin/bash -c "mvn clean && mvn package"

dev:
	docker run -it --rm -v $(WORKING_DIR):/usr/local/app -w /usr/local/app maven:3-openjdk-11 /bin/bash -c "mvn clean && mvn package"
	docker-compose up --build

reset:
	docker run -it --rm -v $(WORKING_DIR):/usr/local/app -w /usr/local/app maven:3-openjdk-11 /bin/bash -c "mvn clean && mvn package"
	docker-compose down -v || :
	docker-compose up --build

ci:
	docker run -it --rm -v $(WORKING_DIR):/usr/local/app -w /usr/local/app maven:3-openjdk-11 /bin/bash -c "mvn clean && mvn package"