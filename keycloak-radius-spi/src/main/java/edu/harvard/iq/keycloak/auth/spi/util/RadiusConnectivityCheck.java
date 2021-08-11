package edu.harvard.iq.keycloak.auth.spi.util;

import org.tinyradius.util.RadiusClient;

public class RadiusConnectivityCheck {

    public static void main(String[] args) throws Exception {
        String hostname = args[0];
        String secret = args[1];
        String username = args[2];
        String password = args[3];
        System.out.println(String.format("Connecting to: %s secret: %s username: %s password: %s", hostname, secret, username, password));
        RadiusClient rc = new RadiusClient(hostname, secret);
        boolean result = rc.authenticate(username, password);
        System.out.println(String.format("Completed test, success=%s", result));
    }
}
