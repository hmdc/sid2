#!/usr/bin/env bash

# Log all output from this script
export RSESSION_LOG_FILE="/home/ood/ondemand/data/sys/dashboard/batch_connect/sys/Rstudio/output/cdfb9438-9ac6-48a4-90ea-e6042661c2ad/rsession.log"

exec &>>"${RSESSION_LOG_FILE}"

# Launch the original command
echo "Launching rsession..."
set -x
exec rsession --r-libs-user "" "${@}"
