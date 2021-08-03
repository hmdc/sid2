package edu.harvard.iq.keycloak.auth.spi.config;

public class InvalidConfigurationException extends RuntimeException{

    public InvalidConfigurationException(String message) {
        super(message);
    }

    public InvalidConfigurationException(String message, Throwable cause) {
        super(message, cause);
    }
}
