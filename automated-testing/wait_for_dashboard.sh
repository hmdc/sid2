#!/bin/bash

ENDPOINT="${ENDPOINT:-http://localhost:33000/pun/dev/dashboard}"
OOD_USERNAME="${OOD_USERNAME:-ood}"
OOD_PASSWORD="${OOD_PASSWORD:-ood}"

echo "Trying: ${ENDPOINT} with username: ${OOD_USERNAME}"

for i in {1..20}; do
  STATUS_RECEIVED=$(curl -s -o /dev/null -L -w ''%{http_code}'' -u ${OOD_USERNAME}:${OOD_PASSWORD} ${ENDPOINT})
  if [ $STATUS_RECEIVED == "200" ]; then
    echo "Sid Dashboard up and running..."
    exit 0
  fi
  echo "dashboard status: $STATUS_RECEIVED"
  sleep 25
done
echo "LOGS -----------------------"
docker logs ood
echo "LOGS -----------------------"
echo "Sid Dashboard not running..."
exit 1