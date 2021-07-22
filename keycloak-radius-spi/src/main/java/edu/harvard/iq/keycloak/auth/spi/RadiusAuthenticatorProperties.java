package edu.harvard.iq.keycloak.auth.spi;

import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.models.AuthenticatorConfigModel;
import org.keycloak.provider.ProviderConfigProperty;

import java.util.Optional;

public enum RadiusAuthenticatorProperties {
    HOST("RADIUS hostname *", "RADIUS server hostname, eg: radius.server.com"),
    PORT("RADIUS port", "Optional. Override value for RADIUS server port, defaults to 1812"),
    SHARED_SECRET("RADIUS shared secret *", "RADIUS server shared secret"),
    FORM_TOKEN_LABEL("Form token field label", "Optional. Text label for the TOTP token form field, defaults to token");

    private ProviderConfigProperty providerProperty;

    private RadiusAuthenticatorProperties(String label, String help) {
        providerProperty = new ProviderConfigProperty(getPropertyKey(), label, help, ProviderConfigProperty.STRING_TYPE, null);
    }

    private String getPropertyKey() {
        return String.format("radiusmfa.%s", this.name().toLowerCase());
    }

    public ProviderConfigProperty getProviderProperty() {
        return providerProperty;
    }

    public Optional<String> getValue(AuthenticationFlowContext context) {
        AuthenticatorConfigModel config = context.getAuthenticatorConfig();
        if (config == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(config.getConfig().get(getPropertyKey()));
    }
}
