# Keycloak Radius SPI - Radius MFA
`Radius MFA` is a custom service provider that integrates Radius as an authenticator execution for Keycloak authentication flow.  
The service provider is configurable, the following parameters can be provided:
 * Hostname
 * Port
 * Shared secret
 * Form token field label

## System requirements
 * java >= 8
 * mvn 3.8
 * GNU Make. Tested with version 3.81

## Radius MFA Authenticator Installation
Build the `Radius MFA` custom SPI jar, from the root of the project, execute:  
`make build`  
This will generate the `target/keycloak-radius-spi-jar-with-dependencies.jar` JAR artifact.  
Copy the JAR into the Keycloak deployment folder, usually: `/opt/jboss/keycloak/standalone/deployments/`  
Keycloak supports hot deployments, so copying the JAR artifact should automatically deploy the SPI.

Once deployed, the `Radius MFA` flow execution will be available to use within an authentication flow.  
To access the configuration parameters, once the `Radius MFA` execution has been added to an authentication flow, The config menu is available on right-hand side of the execution under `Actions > Config`.

### Sample log entries when deploying the custom SPI
Standard log location folder: `/opt/jboss/keycloak/standalone/log`
```
14:48:12,564 INFO  [org.jboss.as.server.deployment] (MSC service thread 1-4) WFLYSRV0027: Starting deployment of "keycloak-radius-spi-jar-with-dependencies.jar" (runtime-name: "keycloak-radius-spi-jar-with-dependencies.jar")
14:48:13,211 INFO  [org.keycloak.subsystem.server.extension.KeycloakProviderDeploymentProcessor] (MSC service thread 1-3) Deploying Keycloak provider: keycloak-radius-spi-jar-with-dependencies.jar
```

### Sample Browser authentication flow configuration

## Local Installation
Run `make` from the root of the project. This will build the `Radius MFA` SPI, install it and start the Keycloak and Radius containers.

After the containers have started, launch the Keycloak web interface: http://localhost:8080  
```
admin username: admin
admin password: admin
```

### Local Radius configuration
Local Radius users are configured using the [./raddb/authorize file](./raddb/authorize)

### Local Keycloak configuration
TODO: Create realm  
TODO: Create users  
TODO: Update authentication workflow with custom SPI

## Testing Radius connectivity
To quickly test the connectivity to the Radius server, we have created a small utility class that will make an authentication request.  
To execute, build the `Radius MFA` custom SPI jar and execute the utility class:  
```
make build
java -cp target/keycloak-radius-spi-jar-with-dependencies.jar edu.harvard.iq.keycloak.auth.spi.RadiusConnectivityCheck radius-host radius-secret username pasword
```