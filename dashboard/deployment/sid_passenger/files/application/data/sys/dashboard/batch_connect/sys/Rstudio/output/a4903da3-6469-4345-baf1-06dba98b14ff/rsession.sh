#!/usr/bin/env bash

# Log all output from this script
export RSESSION_LOG_FILE="/home/ood/ondemand/data/sys/dashboard/batch_connect/sys/Rstudio/output/a4903da3-6469-4345-baf1-06dba98b14ff/rsession.log"

exec &>>"${RSESSION_LOG_FILE}"

# Launch the original command
echo "Launching rsession..."
set -x
exec rsession --r-libs-user "" "${@}"
