#!/bin/bash
set -e
/usr/sbin/sshd
exec /usr/local/bin/docker-entrypoint.sh "$@"
