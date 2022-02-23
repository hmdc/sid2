# Sid Next GEN Landing Site
React application to server content for sid.harvard.edu

## Local environment
The service has been developed using:
* `node/16.4.0`
* `npm/7.4.3`
* `React@17.0.1`

## Prerequisites
Clone this repo:
```
git clone git@github.com:hmdc/sid2.git
cd sid2/sid-landing-site
```

Install Homebrew:  
`which brew || ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Install/Upgrade Node.js. The following tools all track the `../.node-version` file within the parent parent project
```
node --version |grep -q "^v16\." || brew unlink node
node --version |grep -q "^v16\." || brew install node@16
brew upgrade node@16
brew link --overwrite --force node@16
```
If you need to manage multiple version of Node, use [n](https://github.com/tj/n)

## Building and testing
Install all the libraries needed for the project:  
`npm install`

Build the app. The `build` directory will contain all generated files:  
`npm run build`

Run the tests:  
`npm test`

## Running the service locally
Running using react-scripts:  
`npm start`

[http://localhost:3000](http://localhost:3000) to view the site.

### Docker
The docker configuration uses a `node` image to build the project and the `nginx` image to run the site.

Install Docker:  
[https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)  
This requires creating a (free) Docker Hub account.

Run this command from the `sid-landing-site` project root folder.  
This command will build the Docker image and run it:  
`make docker`

[http://localhost:3000](http://localhost:3000) to view the site.

To stop it, press <ctrl+c>. It will cleanup the container as well.

## Deploy to AWS using serverless framework
Serverless framework is installed as a dev dependency. There is a deployment script under `preview` folder.  
This script will build the project, create an S3 bucket in AWS and copy the contents of the `build` folder into it.  
This bucket is suitable for a demo, but for a production deployment a CloudFront Distribution should be used, so that the site returns the appropriate HTTP error pages.

It requires the AWS CLI to be installed locally and a valid AWS account to be configfured with the AWS CLI tool.  

Note that if your AWS account requires MFA, you can no longer use an API token directly (as of ~2020). Attempting to do so will result in [obscure "Access Denied" errors](https://github.com/serverless/serverless/issues/4285#issuecomment-338177829). Instead you must [generate temporary credentials](https://aws.amazon.com/premiumsupport/knowledge-center/authenticate-mfa-cli/) ([example](https://wiki.harvard.edu/confluence/display/HMDC/Terraforming+Sid#TerraformingSid-Generateasessiontoken)).
(Remember, never enter your secret access key anywhere it might be logged or publicly visible, such as your shell history file or `ps` on a multi-user system.)

To run, select a globally unique S3 bucket name, set AWS auth environment variables and execute:  
`./preview/preview.sh <bucket_name>`

E.g., with a profile named `dev-temp` configured in `~/.aws/credentials`:  
`AWS_PROFILE=dev-temp ./preview/preview.sh myname-sid-landing-site-preview`

