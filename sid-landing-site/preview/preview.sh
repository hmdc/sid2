#!/bin/bash
react-scripts build && sls deploy -v --stage=dev --config ./preview/serverless.yml && aws s3 sync build/ s3://aday-sid-landing-site-preview