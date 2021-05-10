#!/usr/bin/env bash

# Log all output from this script
export RSESSION_LOG_FILE="/home/ood/ondemand/data/sys/dashboard/batch_connect/sys/Rstudio/output/c1c8dab5-68c9-4ea5-829d-6ec03cacfe43/rsession.log"

exec &>>"${RSESSION_LOG_FILE}"

# Launch the original command
echo "Launching rsession..."
set -x
exec rsession --r-libs-user "" "${@}"
