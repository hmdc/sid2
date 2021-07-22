package edu.harvard.iq.keycloak.auth.spi;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.keycloak.provider.ProviderConfigProperty;

public class RadiusAuthenticatorPropertiesTest {

    @Test
    public void getProviderProperty_should_return_Keycloak_ProviderConfigProperty() {
        ProviderConfigProperty result = RadiusAuthenticatorProperties.HOST.getProviderProperty();
        MatcherAssert.assertThat(result, Matchers.notNullValue());
    }

}