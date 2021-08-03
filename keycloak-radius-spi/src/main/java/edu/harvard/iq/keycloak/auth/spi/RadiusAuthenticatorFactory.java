package edu.harvard.iq.keycloak.auth.spi;

import edu.harvard.iq.keycloak.auth.spi.config.HostnamesParser;
import org.jboss.logging.Logger;
import org.keycloak.Config;
import org.keycloak.authentication.Authenticator;
import org.keycloak.authentication.AuthenticatorFactory;
import org.keycloak.models.AuthenticationExecutionModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.provider.ProviderConfigProperty;

import java.util.Arrays;
import java.util.List;

public class RadiusAuthenticatorFactory implements AuthenticatorFactory {

    private static final Logger logger = Logger.getLogger(RadiusAuthenticator.class);

    public static final String PROVIDER_ID = "iqss-radius-authenticator";

    private final RadiusAuthServiceFactory radiusAuthServiceFactory;
    private final List<ProviderConfigProperty> configProperties;

    public RadiusAuthenticatorFactory() {
        radiusAuthServiceFactory = new RadiusAuthServiceFactory(new HostnamesParser());
        configProperties = Arrays.asList(
                RadiusAuthenticatorProperty.HOSTNAMES.getProviderProperty(),
                RadiusAuthenticatorProperty.SHARED_SECRET.getProviderProperty(),
                RadiusAuthenticatorProperty.FORM_TOKEN_LABEL.getProviderProperty(),
                RadiusAuthenticatorProperty.CLIENT_RETRIES.getProviderProperty(),
                RadiusAuthenticatorProperty.CLIENT_TIMEOUT.getProviderProperty()
                );
        logger.info("action=init RadiusAuthenticatorFactory created");
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    @Override
    public Authenticator create(KeycloakSession session) {
        return new RadiusAuthenticator(radiusAuthServiceFactory);
    }

    @Override
    public AuthenticationExecutionModel.Requirement[] getRequirementChoices() {
        return REQUIREMENT_CHOICES;
    }

    @Override
    public boolean  isUserSetupAllowed() {
        return false;
    }

    @Override
    public boolean isConfigurable() {
        return true;
    }

    @Override
    public List<ProviderConfigProperty> getConfigProperties() {
        return configProperties;
    }

    @Override
    public String getHelpText() {
        return "MFA provided by Radius";
    }

    @Override
    public String getDisplayType() {
        return "Radius MFA";
    }

    @Override
    public String getReferenceCategory() {
        return "MFA";
    }

    @Override
    public void init(Config.Scope config) {}

    @Override
    public void postInit(KeycloakSessionFactory factory) {}

    @Override
    public void close() {}
}
