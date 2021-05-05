##Instructions to deploy to production

* Build application with `RAILS_ENV=production`
* `make release` will build the production application and copy the files to the puppet module
* Copy `./application` into `/var/www/ood/apps/sys/sid`
* Copy `./deployment/sid.conf` to `/var/lib/ondemand-nginx/config/apps/sys/sid.conf`


###Running puppet to install sid - This is for testing locally
* make release
* docker run --rm --name puppet --hostname puppet -v "$(pwd)"/deployment:/tmp/deployment puppet/puppetserver
* docker exec -it puppet /bin/bash
* cd /tmp/deployment
* mkdir -p /var/www/ood/apps/sys  
* mkdir -p /var/lib/ondemand-nginx/config/apps/sys
* puppet apply --modulepath=/tmp/deployment -e "include sid_passenger"