package edu.harvard.iq.keycloak.auth.spi;

import org.keycloak.provider.ProviderConfigProperty;

import java.util.Map;
import java.util.Optional;

public enum RadiusAuthenticatorProperty {
    HOSTNAMES("RADIUS hostnames *", "Comma separated list of server hostnames with optional port (defaults to 1812), eg: radius1.server.com,radius2.server.com:1812"),
    SHARED_SECRET("RADIUS shared secret *", "RADIUS server shared secret"),
    CLIENT_TIMEOUT("Client socket timeout", "Optional. Client wait time for a response from RADIUS in milliseconds, defaults to 3000"),
    CLIENT_RETRIES("Client retries", "Optional. Attempts to connect to a Radius server when there are errors, defaults to 3"),
    FORM_TOKEN_LABEL("Form token field label", "Optional. Text label for the TOTP token form field, defaults to token");

    private ProviderConfigProperty providerProperty;

    private RadiusAuthenticatorProperty(String label, String help) {
        providerProperty = new ProviderConfigProperty(getPropertyKey(), label, help, ProviderConfigProperty.STRING_TYPE, null);
    }

    private String getPropertyKey() {
        return String.format("radiusmfa.%s", this.name().toLowerCase());
    }

    public ProviderConfigProperty getProviderProperty() {
        return providerProperty;
    }

    public Optional<String> getValue(Map<String, String> configProperties) {
        return Optional.ofNullable(configProperties.get(getPropertyKey()));
    }
}
