# Sid2 project automated tests

Cypress is a testing tool [https://docs.cypress.io](https://docs.cypress.io)

## TL;DR
To install the dependencies and run the tests locally run:
 * `npm install`
 * `make sid CONFIG=local`

## Installing testing tooling - Cypress
`npm install`

## Running tests
To run tests against `remote-dev`, `staging`, `FASSE`, and `Cannon`, you need to connect to the VPN.

Cypress can be configured using environment variables. We use a feature of Cypress to setup and environment file: `cypress.env.json` with environment specific configuration. In order to support the multiple Sid2 environments, we have created several configuration files for each one of them:
 * `sid/cypress.env.json.local`
 * `sid/cypress.env.json.remote-dev`
 * `sid/cypress.env.json.remote-fasse`
 * `sid/cypress.env.json.staging-cannon`
 * `sid/cypress.env.json.staging-fasse`
 * `sid/cypress.env.json.prod-cannon`
 * `sid/cypress.env.json.prod-fasse`

 Each `make` task that executes a test will create a copy of the enviroment specific file as `cypress.env.json`
 The following `make` tasks will execute the tests locally against each environment using a Cypress runtime to run the tests:
  * `make sid CONFIG=local`
  * `make sid CONFIG=remote-dev`
  * `make sid CONFIG=remote-fasse`
  * `make sid CONFIG=staging-cannon`
  * `make sid CONFIG=staging-fasse`
  * `make sid CONFIG=prod-cannon`
  * `make sid CONFIG=prod-fasse`

  There is a special make task that is used to run the tests within GitHub action: `make test`  
  This task will first start the Sid Dashboard in the local Docker environment and then run the tests against it.

### Sid Dashboard Credentials
In order to connect to the Sid dashboard, we need to provide the automated tests with credentials. We can set environment variables or a credentials file. The environment variables are:
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

For the local environment: `sid/cypress.env.json.local`, the credentials are already configured.

## CLI
We can run `Cypress` through `npm`, a `cypress` script was added to the `package.json` file.  
The `--` parameter is added to pass parameters from the command line to the executed script through npm.

```
Opening Cypress UI
npm run cypress -- open

Running all tests inside a folder
npm run cypress -- run --spec "cypress/integration/sid-dashboard/*"

Running an individual test
npm run cypress -- run --spec "cypress/integration/sid-dashboard/footer.spec.js"

Running with other browsers
npm run cypress -- run --browser chrome"
```

## Tests and Configuration
Tests are located under: `cypress/integration/*`  
General constants and utilites: `cypress/support/base.js`  
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
