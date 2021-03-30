# Sid Next GEN Landing Site
React application to server content for sid.harvard.edu

## Local environment
The service has been developed using:
* `node/15.7.0`
* `npm/7.4.3`
* `yarn/1.22.10`
* `React@17.0.1`

Add `./node-modules/bin` directory to your path to run utilities without installing them globally.
`PATH=$PATH:./node_modules/.bin`

## Building and testing
Install all the libraries needed for the project:  
`yarn install`

Build the app. The `build` directory will contain all generated files:  
`yarn build`

Run the tests:  
`yarn test`

## Running the service locally
Running using react-scripts:  
`yarn start`

[http://localhost:3000](http://localhost:3000) to view the site.

### Docker
The docker configuration uses the `node` image to build the project and the `nginx` image to run the site.

Run these commands from the `sid-landing-site` project root folder.  
Build docker image:  
`docker build -t sid-landing-site:latest .`

Run the image:   
`docker run --name sid -d -p 8080:80 sid-landing-site`

[http://localhost:8080](http://localhost:8080) to view the site.

Stop the image and clean up:  
`docker rm -f sid`

## Deploy to AWS using serverless framework
Serverless framework is installed as a dev dependency. There is a deployment script under `preview` folder.  
This script will build the project, create an S3 bucket in AWS and copy the contents of the `build`folder into it.  
It requires the AWS CLI to be installed locally and a valid AWS account to be configfured with the AWS CLI tool.  
To run, execute:  
`./preview/preview.sh`



