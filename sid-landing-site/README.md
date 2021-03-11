# Sid Next GEN Landing Site
React application to server content for sid.harvard.edu

## Local environment
The service has been developed using:
* `node/15.7.0`
* `npm/7.4.3`
* `yarn/1.22.10`
* `React@17.0.1`

## Running the service locally
Running using react-scripts:  
`yarn start`

[http://localhost:3000](http://localhost:3000) to view the site.

### Docker
The docker configuration uses `node` to build the project and `nginx` to run.

Run these commands from the `sid-landing-site` project root folder.  
Build docker image:  
`docker build -t sid-landing-site:latest .`

Run the image:   
`docker run --name sid -d -p 8080:80 sid-landing-site`

[http://localhost:8080](http://localhost:8080) to view the site.

Stop the image and clean up:  
`docker rm -f sid`

