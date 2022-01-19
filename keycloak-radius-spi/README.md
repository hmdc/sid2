# Keycloak Radius SPI - Radius MFA
`Radius MFA` is a custom service provider that integrates Radius as an authenticator execution for Keycloak authentication flow.  
The service provider is configurable, the following parameters can be provided, see [RadiusAuthenticatorProperty.java]([src/main/java/edu/harvard/iq/keycloak/auth/spi/RadiusAuthenticatorProperty.java) for more information:
 * Hostnames
 * Shared secret
 * Form token field label
 * Client retries
 * Client socket timeout

## System requirements
 * Docker. Tested with version 20.10.6
 * GNU Make. Tested with version 3.81

### Keycloak server
We are using Keycloak version `13.0.1`. In order to align the local development environment, and the development libraries with the production version of Keycloak we need to keep the version in sync.

The Keycloak version for the Docker container is configured in the image section of the keycloak service in the [docker-compose file](docker-compose.yml)
```
...
services:
  keycloak:
    image: quay.io/keycloak/keycloak:13.0.1
    hostname: keycloak
...
```

The Keycloak version for the Java libraries is configured in the properties section of the [Maven POM file](pom.xml)
```
...
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <keycloak.version>13.0.1</keycloak.version>
    </properties>
...
```

### Technical Notes
The `tinyradius` library is used to connect to the Radius server. This library is not deployed into maven central, so the Maven command will not find it.

We have added the library into the project and created a Maven task to install it as part of `clean` target. The make script has been updated to execute `mvn clean` before all tasks.

## Radius MFA Authenticator Installation
To build the `Radius MFA` custom SPI jar:
1) Start the Docker daemon.
2) From the root of the project, execute:  
   `make build`  
   This will generate the `target/keycloak-radius-spi-jar-with-dependencies.jar` JAR artifact.  
3) Copy the JAR into the Keycloak deployment folder, usually: `/opt/jboss/keycloak/standalone/deployments/`  
   Keycloak supports hot deployments, so copying the JAR artifact should automatically deploy the SPI.

Once deployed, the `Radius MFA` flow execution will be available to use within an authentication flow.  
To access the configuration parameters, once the `Radius MFA` execution has been added to an authentication flow, The config menu is available on right-hand side of the execution under `Actions > Config`.

### Configuration properties

- `radiusmfa.hostnames`: Comma separated list of server hostnames with optional port (defaults to 1812), eg: radius1.server.com,radius2.server.com:1812 (required)
- `radiusmfa.shared_secret`: RADIUS server shared secret (required)
- `radiusmfa.form_token_label`: Text label for the TOTP token form field, defaults to "Token" (optional)
- `radiusmfa.client_timeout`: Client wait time for a response from RADIUS in milliseconds, defaults to 3000 (optional)
- `radiusmfa.client_retries`: Number of attempts to connect to a Radius server when there are errors, defaults to 3 (optional)

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
- [Create a realm](https://www.keycloak.org/docs/latest/server_admin/index.html#_create-realm)
- [Create users](https://www.keycloak.org/docs/latest/server_admin/index.html#_create-new-user)
- [Copy the "browser" authentication flow](https://www.keycloak.org/docs/latest/server_admin/index.html#built-in-flows)
- [Update authentication flow to add the custom SPI](https://www.keycloak.org/docs/latest/server_admin/index.html#creating-flows)
- Click `Actions > Config` to configure the SPI
- The `hostnamev for the local Radius server is: `radius:1812`
- The `shared secret` for the local environment is: `testing123`
- Assign the flow as the default browser flow for the Realm (under the Realm config Bindings tab) or a Client (under the Client config Settings tab)

## Testing Radius connectivity
To quickly test the connectivity to the Radius server, we have created a small utility class that will make an authentication request.  
To execute, build the `Radius MFA` custom SPI jar and execute the utility class:  
```
make build
java -cp target/keycloak-radius-spi-jar-with-dependencies.jar edu.harvard.iq.keycloak.auth.spi.util.RadiusConnectivityCheck radius-host radius-secret username pasword
```
