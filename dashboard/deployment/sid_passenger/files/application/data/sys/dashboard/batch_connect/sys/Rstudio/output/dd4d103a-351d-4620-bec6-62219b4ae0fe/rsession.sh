#!/usr/bin/env bash

# Log all output from this script
export RSESSION_LOG_FILE="/home/ood/ondemand/data/sys/dashboard/batch_connect/sys/Rstudio/output/dd4d103a-351d-4620-bec6-62219b4ae0fe/rsession.log"

exec &>>"${RSESSION_LOG_FILE}"

# Launch the original command
echo "Launching rsession..."
set -x
exec rsession --r-libs-user "" "${@}"
