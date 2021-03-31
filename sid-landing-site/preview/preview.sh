#!/bin/bash

if [ -z "$1" ] || [ "$1" == "help" -o "$1" == "-h" -o "$1" == "-?" ]; then
  echo "Deploys a preview of this site to an S3 bucket."
  echo " Usage: $0 <unique_s3_bucket_name>"
  exit 1
fi

if [ -z "$AWS_PROFILE" -a -z "$AWS_ACCESS_KEY_ID" ]; then
  echo "Warning: neither AWS_PROFILE nor AWS_ACCESS_KEY_ID are set. AWSCLI may not work." >&2
fi

if which aws >/dev/null; then
  :
else
  echo "Warning: AWSCLI not found in PATH. You may need to \`brew install awscli\`" >&2
fi

BUCKET_NAME="$1"
export BUCKET_NAME

echo "Building..." && \
npx react-scripts build && \
echo "Deploying..." && \
npx sls deploy -v --stage=dev --config ./preview/serverless.yml && \
echo "Syncing..." && \
aws s3 sync build/ s3://"$1"
