package edu.harvard.iq.keycloak.auth.spi;

import org.jboss.logging.Logger;
import org.tinyradius.util.RadiusClient;

import java.util.Collections;
import java.util.List;

public class RadiusAuthService {

    private static final Logger logger = Logger.getLogger(RadiusAuthService.class);

    private List<RadiusClient> clients;

    public RadiusAuthService(List<RadiusClient> clients) {
        this.clients = Collections.unmodifiableList(clients);;
    }

    //EXPOSED FOR TESTING
    List<RadiusClient> getClients() {
        return this.clients;
    }

    public boolean radiusAuth(String username, String totpToken) {
        for(RadiusClient client: clients) {
            try {
                logger.info(String.format("action=radiusAuth trying... host=%s:%s username=%s", client.getHostName(), client.getAuthPort(), username));
                boolean authResponse = client.authenticate(username, totpToken);
                logger.info(String.format("action=radiusAuth authResponse=%s host=%s:%s username=%s", authResponse, client.getHostName(), client.getAuthPort(), username));
                return authResponse;
            } catch (Exception e) {
                logger.error(String.format("action=radiusAuth result=error host=%s:%s username=%s", client.getHostName(), client.getAuthPort(), username), e);
            }
        }

        logger.error(String.format("action=radiusAuth result=all-failed username=%s clients=%s", username, clients.size()));
        return false;
    }
}
