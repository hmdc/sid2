package edu.harvard.iq.keycloak.auth.spi.config;

import java.util.Optional;

public class RadiusHost {

    public static final int DEFAULT_PORT = 1812;

    private String hostname;
    private int port;

    public RadiusHost(String hostname, Optional<Integer> port) {
        this.hostname = hostname;
        this.port = port.orElse(DEFAULT_PORT);
    }

    public String getHostname() {
        return hostname;
    }

    public int getPort() {
        return port;
    }

    @Override
    public String toString() {
        return new StringBuilder()
                .append("{")
                .append("hostname=").append(hostname)
                .append(", port=").append(port)
                .append("}")
                .toString();
    }
}
