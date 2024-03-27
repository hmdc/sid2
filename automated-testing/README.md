# OnDemand automated tests for IQSS
The automated tests are based on the Cypress testing tool: [https://docs.cypress.io](https://docs.cypress.io)

We have 3 test suites, one suite has been developed for the Sid custom dashboard and FASRC dashboard based on OnDemand version 2.0.29. This suite is called `sid`.

The second suite based on OnDemand version 3.x with the old FASRC configuration. This suite is called `fasrcv3`

The third suite based on OnDemand version 3.x and the Sid and FASRC profiles. This suite is called `ondemand`

The `sid` and `fasrcv3` suites will deprecated and deleted once the new OnDemand environments are deployed into Staging and Production.

## Local environment
The automated tests has been developed and tested using:
* `node/18.16.0`
* `npm/9.5.1`

Install Homebrew:  
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

Use a tool to manage multiple versions of Node, like [n](https://github.com/tj/n)
```
brew install n
```

Install Node.js with n.
```
# Download and install a Node version:
n 18.16.0
# Use n to select the Node version 18.16.0:
n
# Verify current Node version:
node --version
```

## Installing testing tooling and dependencies - Cypress
`npm install`

## Running tests
To run tests against a remote environment, you need to be connected to the appropriate VPN, `fasrc` or `fasse`.

Cypress can be configured using environment variables. We use a feature of Cypress to setup and environment file: `cypress.env.json` with environment specific configuration. Each `make` task that executes a test will create a copy of the enviroment specific file into the `cypress.env.json` file.

### Sid Tests
In order to support the multiple Sid2 environments, we have created several configuration files for each one of them:
 * `sid/cypress.env.json.local` - to be removed.
 * `sid/cypress.env.json.remote-dev` - to be removed.
 * `sid/cypress.env.json.remote-fasse` - to be removed.
 * `sid/cypress.env.json.staging-cannon`
 * `sid/cypress.env.json.staging-fasse`
 * `sid/cypress.env.json.prod-cannon`
 * `sid/cypress.env.json.prod-fasse`

 The following `make` tasks will execute the tests locally against each environment using a Cypress runtime to run the tests:
  * `make sid CONFIG=local` - to be removed.
  * `make sid CONFIG=remote-dev` - to be removed.
  * `make sid CONFIG=remote-fasse` - to be removed.
  * `make sid CONFIG=staging-cannon`
  * `make sid CONFIG=staging-fasse`
  * `make sid CONFIG=prod-cannon`
  * `make sid CONFIG=prod-fasse`

  There is a special make task that is used to run the tests within a GitHub action for the Sid2 project: `make test`  
  This task will first start the Sid custom Dashboard in the local Docker environment and then run the tests against it.

### FASRCv3 and OnDemand Tests
In order to support the multiple OnDemand environments, we have created several configuration files for each one of them:
 * `ondemand/cypress.env.json.local` - to be removed.
 * `ondemand/cypress.env.json.staging-cannon`
 * `ondemand/cypress.env.json.staging-fasse`
 * `ondemand/cypress.env.json.prod-cannon` - to be created after staging deployment.
 * `ondemand/cypress.env.json.prod-fasse`

The following `make` tasks will execute the tests for FASRC v3:
  * `make fasrcv3 CONFIG=staging-cannon`
  * `make fasrcv3 CONFIG=staging-fasse`
  * `make fasrcv3 CONFIG=prod-cannon` - to be created.
  * `make fasrcv3 CONFIG=prod-fasse`

The following `make` tasks will execute the tests for OnDemand v3 with the FASRC and Sid profiles against the different environments:
  * `make ondemand CONFIG=local` - to be removed.
  * `make ondemand CONFIG=staging-cannon`
  * `make ondemand CONFIG=staging-fasse`
  * `make ondemand CONFIG=prod-cannon` - to be created.
  * `make ondemand CONFIG=prod-fasse` - to be created.


### Dashboard Credentials
In order to connect to the dashboard, we need to provide the automated tests with credentials. We can set environment variables or a credentials file. The environment variables are:
 * `OOD_USERNAME`
 * `OOD_PASSWORD`

 example: `env OOD_USERNAME=ood OOD_PASSWORD=ood make sid CONFIG=prod-fasse`

 The credentials file can be droped at the root of the project: `credentials.json`. This is a JSON format file with the username and password, example:
```
{
  "username": "ood",
  "password": "ood"
}
```

For all the local environments, the credentials are already configured in the environment configuration.

## CLI
We can run `Cypress` through `npm`, a `cypress` script was added to the `package.json` file.  
The `--` parameter is added to pass parameters from the command line to the executed script through npm.

When using the `Cypress` CLI, please ensure that the right environment has been copied into `cypress.env.json` file.

```
Opening Cypress UI
npm run cypress -- open

Running all tests inside a folder
npm run cypress -- run --spec "cypress/e2e/sid-dashboard/*"

Running an individual test
npm run cypress -- run --spec "cypress/e2e/sid-dashboard/footer.spec.js"
npm run cypress -- run --spec "cypress/e2e/ondemand/supportticket.cy.js"

Running with other browsers
npm run cypress -- run --browser chrome"
```

## Tests and Configuration
Tests are located under: `cypress/e2e/*`  
General constants and utilites: `cypress/support/base.js` and `cypress/support/utils/*`  
Reading credentials utility: `cypress/plugins/index.js`  
Cypress API reference: [https://docs.cypress.io/api/table-of-contents](https://docs.cypress.io/api/table-of-contents)

### Cypress docker images
Information about Cypress and Docker can be found [here](https://docs.cypress.io/examples/examples/docker#Images)  
We use `cypress/base` to run the automated tests within Docker. The image is configured in the [Makefile](Makefile)

## Cypress console errors
When running through Docker, Cypress prints some error messages:
```
[226:1117/145128.491783:ERROR:bus.cc(392)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
```

According to Cypress support, these are messages printed by the Electron browser and it is [fine to ignore](https://github.com/cypress-io/cypress/issues/4925)
