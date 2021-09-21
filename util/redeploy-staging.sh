#!/bin/bash
NAME="one"
docker run --platform=linux/amd64 -i -t $NAME bash -c "
export ONE_XMLRPC='https://cloud-int.rc.fas.harvard.edu:2633/RPC2' 
oneuser login -f esarmien 
onevm terminate --hard iqssood01
onetemplate instantiate --name "iqssood01" iqssood01 
"
