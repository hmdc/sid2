# default build target
all::

all:: dev
.PHONY: build dev reset

build:
	mvn clean install

dev:
	mvn clean install
	docker-compose up --build

reset:
	mvn clean install
	docker-compose down -v || :
	docker-compose up --build