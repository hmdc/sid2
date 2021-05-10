#!/usr/bin/env bash

# Change working directory to user's home directory
cd "${HOME}"

# Reset module environment (may require login shell for some HPC clusters)
module purge && module restore

# Ensure that the user's configured login shell is used
export SHELL="$(getent passwd $USER | cut -d: -f7)"

# Start up desktop
echo "Launching desktop 'mate'..."
source "/home/ood/ondemand/data/sys/dashboard/batch_connect/sys/OdysseyRD/output/0c4af8b9-d7cd-4eac-81a2-5d76d277c1e4/desktops/mate.sh"
echo "Desktop 'mate' ended..."
