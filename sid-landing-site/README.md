# Sid Next GEN Landing Site
React application to server content for sid.harvard.edu

## Local environment
The service has been developed using:
* `node/15.7.0`
* `npm/7.4.3`
* `yarn/1.22.10`
* `React@17.0.1`

## Prerequisites
Clone this repo
`git clone git@github.com:hmdc/sid2.git`
`cd sid2/sid-landing-site`

Install Homebrew
`which brew || ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Install/Upgrade Node.js
```
node --version |grep -q "^v15\." || brew unlink node
node --version |grep -q "^v15\." || brew install node@15
brew upgrade node@15
brew link --overwrite --force node@15
```
If you need to manage multiple version of Node, use [n](https://github.com/tj/n)

## Building and testing
Install yarn
`npm install yarn`

Install all the libraries needed for the project:  
`npx yarn install`

Build the app. The `build` directory will contain all generated files:  
`npx yarn build`

Run the tests:  
`npx yarn test`

## Running the service locally
Running using react-scripts:  
`npx yarn start`

[http://localhost:3000](http://localhost:3000) to view the site.

### Docker
The docker configuration uses the `node` image to build the project and the `nginx` image to run the site.

Install Docker
[https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)
This requires creating a (free) Docker Hub account.

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
This script will build the project, create an S3 bucket in AWS and copy the contents of the `build` folder into it.  
This bucket is suitable for a demo, but for a production deployment a CloudFront Distribution should be used, so that the site returns the appropriate HTTP status codes.

It requires the AWS CLI to be installed locally and a valid AWS account to be configfured with the AWS CLI tool.  

Edit `./preview/preview.sh` and `./preview/serverless.yml` to specify a unique S3 bucket name.

To run, execute:  
`./preview/preview.sh`



