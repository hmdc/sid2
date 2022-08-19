#!/bin/bash

REMOTE_USERNAME="${1}"
FILE_TEMPLATE_URL="${2}"
FILE_LOCATION="${3}"
CHECK_TEMPLATE_VERSION="${4:-DISABLED}"

FILE_NAME=$(basename "$FILE_LOCATION")

NEW_VERSION_FILE_LOCATION=$(mktemp ${TMPDIR:-/tmp}/dashboard_template.XXXXXX)
if [ $? -ne 0 ]; then
  echo "❌ Unable to create tmp location to download $FILE_TEMPLATE_URL"
  exit 1
fi

echo "Downloading: $FILE_TEMPLATE_URL"
for DOWNLOAD_ATTEMPT in 1 2 3
do
  echo "Attempt $DOWNLOAD_ATTEMPT..."
  curl -sSL $FILE_TEMPLATE_URL --user $REMOTE_USERNAME -o $NEW_VERSION_FILE_LOCATION
  echo "Verifying download for $FILE_NAME. Temp location: $NEW_VERSION_FILE_LOCATION"
  grep -q 'require "ood_core/refinements/hash_extensions"' $NEW_VERSION_FILE_LOCATION
  if [ $? -eq 0 ]; then
    echo "✅ template $FILE_LOCATION downloaded correctly"
    if [ $CHECK_TEMPLATE_VERSION == "check_version" ]; then
      # WE NEED TO CHECK THE LOCAL VERSION WITH THE REMOTE ONE
      echo "Comparing download with current version..."
      diff $FILE_LOCATION $NEW_VERSION_FILE_LOCATION &>/dev/null
      if [ $? -eq 0 ]; then
        echo "✅ Current version in sync"
      else
        # FILES ARE DIFFERENT => SHOW MESSAGE TO COMMIT THE LATEST VERSION
        echo "❗❗ File: $FILE_LOCATION has diverged from production. Please create a new issue to sync the templates."
      fi
    fi
    cp -f $NEW_VERSION_FILE_LOCATION $FILE_LOCATION
    if [ $? -ne 0 ]; then
      echo "❌ Unable to copy downloaded file: $NEW_VERSION_FILE_LOCATION into $FILE_LOCATION"
      exit 1
    fi
    rm $NEW_VERSION_FILE_LOCATION
    exit 0
  fi

  echo "❌ Error"
done

echo "❌ invalid template for $FILE_NAME. Temp location: $NEW_VERSION_FILE_LOCATION"
exit 1