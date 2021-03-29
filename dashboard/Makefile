# default build target
all::

all:: dev
.PHONY: dev

dev:
 @echo <<SID2>> Tearing down development stack if alive.
 docker-compose down -v || :
 docker-compuse up
 
