#!/usr/bin/env bash

# Change working directory to user's home directory
cd "${HOME}"

# Reset module environment (may require login shell for some HPC clusters)
module purge && module restore

# Ensure that the user's configured login shell is used
export SHELL="$(getent passwd $USER | cut -d: -f7)"

# Start up desktop
echo "Launching desktop 'mate'..."
source "/home/ood/ondemand/data/sys/dashboard/batch_connect/sys/OdysseyRD/output/79cae2a4-3f3d-4b7c-b0d2-fc19a63093e9/desktops/mate.sh"
echo "Desktop 'mate' ended..."
