package edu.harvard.iq.keycloak.auth.spi;

import edu.harvard.iq.keycloak.auth.spi.config.HostnamesParser;
import edu.harvard.iq.keycloak.auth.spi.config.InvalidConfigurationException;
import edu.harvard.iq.keycloak.auth.spi.config.RadiusHost;
import org.jboss.logging.Logger;
import org.tinyradius.util.RadiusClient;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class RadiusAuthServiceFactory {

    private static final Logger logger = Logger.getLogger(RadiusAuthServiceFactory.class);

    private final HostnamesParser hostnamesParser;

    public RadiusAuthServiceFactory(HostnamesParser hostnamesParser) {
        this.hostnamesParser = hostnamesParser;
    }

    public RadiusAuthService createService(Map<String ,String> properties) {
        Optional<String> hostnames = RadiusAuthenticatorProperty.HOSTNAMES.getValue(properties);
        Optional<String>  secret = RadiusAuthenticatorProperty.SHARED_SECRET.getValue(properties);
        Optional<String>  timeout = RadiusAuthenticatorProperty.CLIENT_TIMEOUT.getValue(properties);
        Optional<String>  retries = RadiusAuthenticatorProperty.CLIENT_RETRIES.getValue(properties);

        if(!hostnames.isPresent() || !secret.isPresent()) {
            throw new InvalidConfigurationException("Invalid Configuration, RADIUS hostnames and secret must be provided");
        }

        List<RadiusHost> radiusHosts = hostnamesParser.parse(hostnames.get());

        List<RadiusClient> radiusClients = radiusHosts.stream()
                .map(radiusHost -> createRadiusClient(radiusHost, secret.get(), retries, timeout))
                .collect(Collectors.toList());

        RadiusAuthService radiusAuthService = new RadiusAuthService(radiusClients);
        logger.info(String.format("action=createService result=success radiusHosts=%s retries=%s timeout=%s", radiusHosts, retries, timeout));
        return radiusAuthService;
    }

    private RadiusClient createRadiusClient(RadiusHost radiusHost, String  secret, Optional<String>  retries, Optional<String>  timeout) {
        try {
            RadiusClient client = new RadiusClient(radiusHost.getHostname(), secret);
            client.setAuthPort(radiusHost.getPort());
            if (retries.isPresent()) {
                client.setRetryCount(Integer.parseInt(retries.get()));
            }

            if (timeout.isPresent()) {
                client.setSocketTimeout(Integer.parseInt(timeout.get()));
            }

            return client;
        }catch (Exception e) {
            throw new InvalidConfigurationException(String.format("Unable to create Radius client, radiusHost=%s retries=%s timeout=%s", radiusHost, retries, timeout), e);
        }

    }
}
