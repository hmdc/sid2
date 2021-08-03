package edu.harvard.iq.keycloak.auth.spi.config;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class HostnamesParser {

    public List<RadiusHost> parse(String hostnamesString) {
        if(hostnamesString == null || hostnamesString.isEmpty()) {
            return Collections.emptyList();
        }

        List<RadiusHost> hostnames = new ArrayList<>();
        for (String host : hostnamesString.split(",")) {
            try {
                //TRICK TO MAKE CONFIGURED HOSTNAME A VALID URI
                //ADD "radius://" AS FAKE SCHEME
                URI hostAsUri = new URI("radius://" + host.trim());
                if(hostAsUri.getHost() == null) {
                    throw new InvalidConfigurationException(String.format("Invalid hostname: %s", host));
                }

                //URI WILL RETURN -1 FOR UNDEFINED PORTS. TRANSFORM -1 TO Optional.empty()
                hostnames.add(new RadiusHost(hostAsUri.getHost(), Optional.of(hostAsUri.getPort()).map(port -> port < 0 ? null : port)));
            }catch (Exception e) {
                throw new InvalidConfigurationException(String.format("Invalid hostname: %s", host), e);
            }
        }

        return hostnames;
    }
}
