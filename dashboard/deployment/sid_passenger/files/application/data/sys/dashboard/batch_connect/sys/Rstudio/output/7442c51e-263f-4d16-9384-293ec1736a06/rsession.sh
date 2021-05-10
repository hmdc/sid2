#!/usr/bin/env bash

# Log all output from this script
export RSESSION_LOG_FILE="/home/ood/ondemand/data/sys/dashboard/batch_connect/sys/Rstudio/output/7442c51e-263f-4d16-9384-293ec1736a06/rsession.log"

exec &>>"${RSESSION_LOG_FILE}"

# Launch the original command
echo "Launching rsession..."
set -x
exec rsession --r-libs-user "" "${@}"
