#!/usr/bin/env bash

# Change working directory to user's home directory
cd "${HOME}"

# Reset module environment (may require login shell for some HPC clusters)
module purge && module restore

# Ensure that the user's configured login shell is used
export SHELL="$(getent passwd $USER | cut -d: -f7)"

# Start up desktop
echo "Launching desktop 'mate'..."
source "/home/ood/ondemand/data/sys/dashboard/batch_connect/sys/OdysseyRD/output/60c55bba-eee7-4608-920f-fbc5c3a31895/desktops/mate.sh"
echo "Desktop 'mate' ended..."
