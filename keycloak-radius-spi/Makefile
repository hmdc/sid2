# default build target
all::

all:: dev
.PHONY: build dev reset

build:
	mvn clean
	mvn install

dev:
	mvn clean
	mvn install
	docker-compose up --build

reset:
	mvn clean
	mvn install
	docker-compose down -v || :
	docker-compose up --build