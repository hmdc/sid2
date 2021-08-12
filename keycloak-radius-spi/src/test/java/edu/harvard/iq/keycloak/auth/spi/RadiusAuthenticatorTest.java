package edu.harvard.iq.keycloak.auth.spi;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.AuthenticationFlowError;
import org.keycloak.forms.login.LoginFormsProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.mockito.Mockito;

import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class RadiusAuthenticatorTest {

    private static final String USERNAME = UUID.randomUUID().toString();

    private final RadiusAuthServiceFactory radiusAuthServiceFactory = Mockito.mock(RadiusAuthServiceFactory.class);
    private final RadiusAuthService radiusAuthService = Mockito.mock(RadiusAuthService.class);

    private final RadiusAuthenticator underTest = new RadiusAuthenticator(radiusAuthServiceFactory);

    private AuthenticationFlowContext authenticationFlowContext;
    private Map<String, String> properties;
    private LoginFormsProvider formsProvider;

    @Before
    public void beforeEachTest() {
        authenticationFlowContext = Mockito.mock(AuthenticationFlowContext.class, Mockito.RETURNS_DEEP_STUBS);
        formsProvider = Mockito.mock(LoginFormsProvider.class, Mockito.RETURNS_DEEP_STUBS);

        properties = new HashMap<>();
        properties.put(RadiusAuthenticatorProperty.FORM_TOKEN_LABEL.getProviderProperty().getName(), "TokenLabel");

        Mockito.when(radiusAuthServiceFactory.createService(properties)).thenReturn(radiusAuthService);

        Mockito.when(authenticationFlowContext.getUser().getUsername()).thenReturn(USERNAME);
        Mockito.when(authenticationFlowContext.getAuthenticatorConfig().getConfig()).thenReturn(properties);
        Mockito.when(authenticationFlowContext.form()).thenReturn(formsProvider);
    }


    @Test
    public void authenticate_should_configure_radius_token_form() {
        underTest.authenticate(authenticationFlowContext);

        verify_create_form();
        Mockito.verify(authenticationFlowContext).challenge(Mockito.any(Response.class));
    }

    @Test
    public void action_should_call_AuthenticationFlowContext_success_when_user_token_authentication_is_successful() {
        Mockito.when(authenticationFlowContext.getHttpRequest().getDecodedFormParameters().getFirst("totp")).thenReturn("tokenValue");
        Mockito.when(radiusAuthService.radiusAuth(USERNAME, "tokenValue")).thenReturn(true);
        underTest.action(authenticationFlowContext);

        Mockito.verify(authenticationFlowContext).success();
        Mockito.verify(radiusAuthService).radiusAuth(USERNAME, "tokenValue");
    }

    @Test
    public void action_should_call_AuthenticationFlowContext_failureChallenge_when_user_token_authentication_fails() {
        Mockito.when(authenticationFlowContext.getHttpRequest().getDecodedFormParameters().getFirst("totp")).thenReturn("tokenValue");
        Mockito.when(radiusAuthService.radiusAuth(USERNAME, "tokenValue")).thenReturn(false);
        underTest.action(authenticationFlowContext);

        Mockito.verify(authenticationFlowContext).failureChallenge(Mockito.eq(AuthenticationFlowError.INVALID_CREDENTIALS), Mockito.any(Response.class));
        Mockito.verify(radiusAuthService).radiusAuth(USERNAME, "tokenValue");
        verify_create_form();
    }

    @Test
    public void action_should_call_AuthenticationFlowContext_failureChallenge_when_user_token_not_provided() {
        Mockito.when(authenticationFlowContext.getHttpRequest().getDecodedFormParameters().getFirst("totp")).thenReturn(null);
        underTest.action(authenticationFlowContext);

        Mockito.verify(authenticationFlowContext).failureChallenge(Mockito.eq(AuthenticationFlowError.INVALID_CREDENTIALS), Mockito.any(Response.class));
        verify_create_form();
    }

    @Test
    public void configuredFor_should_return_true(){
        KeycloakSession keycloakSession = Mockito.mock(KeycloakSession.class);
        RealmModel realmModel = Mockito.mock(RealmModel.class);
        UserModel userModel = Mockito.mock(UserModel.class);
        MatcherAssert.assertThat(underTest.configuredFor(keycloakSession, realmModel, userModel), Matchers.is(true));
    }

    private void verify_create_form() {
        Mockito.verify(authenticationFlowContext).form();
        Mockito.verify(formsProvider).setAttribute(Mockito.eq( "formTokenLabel"), Mockito.eq( "TokenLabel"));
        Mockito.verify(formsProvider).createForm(Mockito.eq( "radius-mfa.ftl"));
    }

}