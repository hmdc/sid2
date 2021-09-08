package edu.harvard.iq.keycloak.auth.spi;

import org.jboss.logging.Logger;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.AuthenticationFlowError;
import org.keycloak.authentication.Authenticator;
import org.keycloak.forms.login.LoginFormsProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;

import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

public class RadiusAuthenticator implements Authenticator {

    private static final Logger logger = Logger.getLogger(RadiusAuthenticator.class);

    private final RadiusAuthServiceFactory radiusAuthServiceFactory;

    public RadiusAuthenticator(RadiusAuthServiceFactory radiusAuthServiceFactory) {
        this.radiusAuthServiceFactory = radiusAuthServiceFactory;
    }

    @Override
    public void authenticate(AuthenticationFlowContext authenticationFlowContext) {
        String username = authenticationFlowContext.getUser().getUsername();
        Map<String, String> configProperties = Optional.ofNullable(authenticationFlowContext.getAuthenticatorConfig()).map(c -> c.getConfig()).orElse(Collections.emptyMap());
        String formTokenLabel = getFormTokenLabel(configProperties);
        authenticationFlowContext.challenge(createForm(authenticationFlowContext, formTokenLabel, Optional.empty()));
        logger.info(String.format("action=authenticate result=show-form username=%s", username));
    }

    @Override
    public void action(AuthenticationFlowContext authenticationFlowContext) {
        MultivaluedMap<String, String> formData = authenticationFlowContext.getHttpRequest().getDecodedFormParameters();
        String username = authenticationFlowContext.getUser().getUsername();

        Map<String, String> configProperties = Optional.ofNullable(authenticationFlowContext.getAuthenticatorConfig()).map(c -> c.getConfig()).orElse(Collections.emptyMap());
        String formTokenLabel = getFormTokenLabel(configProperties);
        String totpValue = formData.getFirst("totp");
        if (totpValue == null || totpValue.isEmpty()) {
            logger.info(String.format("action=action result=missing-totp username=%s", username));
            authenticationFlowContext.failureChallenge(AuthenticationFlowError.INVALID_CREDENTIALS, createForm(authenticationFlowContext, formTokenLabel, Optional.of("Please enter a value")));
            return;
        }

        RadiusAuthService radiusAuthService = radiusAuthServiceFactory.createService(configProperties);

        if (!radiusAuthService.radiusAuth(username, totpValue)) {
            logger.info(String.format("action=action result=auth-failure username=%s", username));
            authenticationFlowContext.failureChallenge(AuthenticationFlowError.INVALID_CREDENTIALS, createForm(authenticationFlowContext, formTokenLabel, Optional.of(String.format("Invalid %s", formTokenLabel))));
            return;
        }

        logger.info(String.format("action=action result=success username=%s", username));
        authenticationFlowContext.success();
    }

    @Override
    public boolean requiresUser() {
        return false;
    }

    @Override
    public boolean configuredFor(KeycloakSession keycloakSession, RealmModel realmModel, UserModel userModel) {
        // No user-specific configuration needed, therefore always "configured"
        return true;
    }

    @Override
    public void setRequiredActions(KeycloakSession keycloakSession, RealmModel realmModel, UserModel userModel) {
        logger.info("setRequiredActions");
    }

    @Override
    public void close() {
        logger.info("close");
    }

    private Response createForm(AuthenticationFlowContext authenticationFlowContext, String formTokenLabel, Optional<String> errorMessage) {
        LoginFormsProvider form = authenticationFlowContext.form();
        form.setAttribute("formTokenLabel", formTokenLabel);

        errorMessage.ifPresent(m -> form.setError(m));;

        return form.createForm("radius-mfa.ftl");
    }

    private String getFormTokenLabel(Map<String, String> configProperties) {
        return RadiusAuthenticatorProperty.FORM_TOKEN_LABEL.getValue(configProperties).orElse("Token");
    }
}
