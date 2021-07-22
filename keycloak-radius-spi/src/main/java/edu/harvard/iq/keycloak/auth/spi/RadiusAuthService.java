package edu.harvard.iq.keycloak.auth.spi;

import org.jboss.logging.Logger;
import org.tinyradius.util.RadiusClient;

public class RadiusAuthService {

    private static final Logger logger = Logger.getLogger(RadiusAuthService.class);

    private RadiusClient client;

    public RadiusAuthService(RadiusClient client) {
        this.client = client;
    }

    public boolean radiusAuth(String username, String totpToken) {
        logger.info(String.format("action=radiusAuth host=%s:%s username=%s", client.getHostName(), client.getAuthPort(), username));
        try {
            boolean authResponse = client.authenticate(username, totpToken);
            logger.info(String.format("action=radiusAuth authResponse=%s host=%s:%s username=%s", authResponse, client.getHostName(), client.getAuthPort(), username));
            return authResponse;
        } catch (Exception e) {
            logger.error(String.format("action=radiusAuth result=error host=%s:%s username=%s", client.getHostName(), client.getAuthPort(), username), e);
            return false;
        }
    }
}
