package edu.harvard.iq.keycloak.auth.spi;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.keycloak.authentication.Authenticator;
import org.keycloak.models.KeycloakSession;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class RadiusAuthenticatorFactoryTest {

    private final RadiusAuthenticatorFactory underTest = new RadiusAuthenticatorFactory();

    @Test
    public void getConfigProperties_should_return_all_RadiusAuthenticatorProperty_values() {
        List<String> result = underTest.getConfigProperties().stream().map(p -> p.getName()).collect(Collectors.toList());

        List<String> expectedProperties = Arrays.stream(RadiusAuthenticatorProperty.values()).map(p -> p.getProviderProperty().getName()).collect(Collectors.toList());

        for (String item: expectedProperties) {
            MatcherAssert.assertThat(item, Matchers.isIn(result));
        }
    }

    @Test
    public void create_should_create_RadiusAuthenticator_object(){
        KeycloakSession sessionMock = Mockito.mock(KeycloakSession.class);
        Authenticator result = underTest.create(sessionMock);
        MatcherAssert.assertThat(result, Matchers.notNullValue());
        MatcherAssert.assertThat(result instanceof RadiusAuthenticator, Matchers.is(true));
    }

    @Test
    public void isConfigurable_should_return_true(){
        MatcherAssert.assertThat(underTest.isConfigurable(), Matchers.is(true));
    }

    @Test
    public void isUserSetupAllowed_should_return_false(){
        MatcherAssert.assertThat(underTest.isUserSetupAllowed(), Matchers.is(false));
    }
}