package edu.harvard.iq.keycloak.auth.spi;

import org.jboss.logging.Logger;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.AuthenticationFlowError;
import org.keycloak.authentication.Authenticator;
import org.keycloak.forms.login.LoginFormsProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.tinyradius.util.RadiusClient;

import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import java.util.Optional;

public class RadiusAuthenticator implements Authenticator {

    private static final Logger logger = Logger.getLogger(RadiusAuthenticator.class);

    @Override
    public void authenticate(AuthenticationFlowContext authenticationFlowContext) {
        String username = authenticationFlowContext.getUser().getUsername();
        logger.info(String.format("action=authenticate result=show-form username=%s", username));
        String formTokenLabel = RadiusAuthenticatorProperties.FORM_TOKEN_LABEL.getValue(authenticationFlowContext).orElse("Token");
        authenticationFlowContext.challenge(createForm(authenticationFlowContext, formTokenLabel, Optional.empty()));
    }

    @Override
    public void action(AuthenticationFlowContext authenticationFlowContext) {
        MultivaluedMap<String, String> formData = authenticationFlowContext.getHttpRequest().getDecodedFormParameters();
        String username = authenticationFlowContext.getUser().getUsername();
        if (formData.containsKey("cancel")) {
            logger.info(String.format("action=action result=cancel username=%s", username));
            authenticationFlowContext.resetFlow();
            return;
        }

        String formTokenLabel = RadiusAuthenticatorProperties.FORM_TOKEN_LABEL.getValue(authenticationFlowContext).orElse("Token");
        String totpValue = formData.getFirst("totp");
        if (totpValue == null || totpValue.isEmpty()) {
            logger.info(String.format("action=action result=missing-totp username=%s", username));
            authenticationFlowContext.failureChallenge(AuthenticationFlowError.INVALID_CREDENTIALS, createForm(authenticationFlowContext, formTokenLabel, Optional.of("missing TOTP")));
            return;
        }

        Optional<String> host = RadiusAuthenticatorProperties.HOST.getValue(authenticationFlowContext);
        Optional<String>  port = RadiusAuthenticatorProperties.PORT.getValue(authenticationFlowContext);
        Optional<String>  secret = RadiusAuthenticatorProperties.SHARED_SECRET.getValue(authenticationFlowContext);
        RadiusClient radiusClient = new RadiusClient(host.get(), secret.get());
        port.ifPresent(p -> radiusClient.setAuthPort(Integer.valueOf(p)));
        RadiusAuthService radiusAuthService = new RadiusAuthService(radiusClient);

        if (!radiusAuthService.radiusAuth(username, totpValue)) {
            logger.info(String.format("action=action result=invalid-totp username=%s", username));
            authenticationFlowContext.failureChallenge(AuthenticationFlowError.INVALID_CREDENTIALS, createForm(authenticationFlowContext, formTokenLabel, Optional.of("INVALID TOTP")));
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
        UserModel user = authenticationFlowContext.getUser();

        LoginFormsProvider form = authenticationFlowContext.form()
                .setAttribute("username", user.getUsername())
                .setAttribute("formTokenLabel", formTokenLabel);

        errorMessage.ifPresent(m -> form.setError(m));;

        return form.createForm("radius-mfa.ftl");
    }
}
