package edu.harvard.iq.keycloak.auth.spi;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.keycloak.provider.ProviderConfigProperty;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class RadiusAuthenticatorPropertyTest {

    @Test
    public void should_have_all_expected_properties() {
        List<RadiusAuthenticatorProperty> expectedProperties = Arrays.asList(
                RadiusAuthenticatorProperty.HOSTNAMES,
                RadiusAuthenticatorProperty.SHARED_SECRET,
                RadiusAuthenticatorProperty.FORM_TOKEN_LABEL,
                RadiusAuthenticatorProperty.CLIENT_RETRIES,
                RadiusAuthenticatorProperty.CLIENT_TIMEOUT
        );

        for (RadiusAuthenticatorProperty item: RadiusAuthenticatorProperty.values()) {
            MatcherAssert.assertThat(item, Matchers.isIn(expectedProperties));
        }
    }

    @Test
    public void getProviderProperty_should_return_Keycloak_ProviderConfigProperty() {
        for (RadiusAuthenticatorProperty item: RadiusAuthenticatorProperty.values()) {
            MatcherAssert.assertThat(item.getProviderProperty(), Matchers.notNullValue());
            MatcherAssert.assertThat(item.getProviderProperty().getName(), Matchers.notNullValue());
            MatcherAssert.assertThat(item.getProviderProperty().getLabel(), Matchers.notNullValue());
            MatcherAssert.assertThat(item.getProviderProperty().getHelpText(), Matchers.notNullValue());
            MatcherAssert.assertThat(item.getProviderProperty().getType(), Matchers.is(ProviderConfigProperty.STRING_TYPE));
        }
    }

    @Test
    public void getValue_should_return_the_configured_value_in_AuthenticatorConfigModel() {
        Map<String, String> configProperties = Mockito.mock(Map.class);
        Mockito.when(configProperties.get(Mockito.any())).thenReturn("propertyValue");
        for (RadiusAuthenticatorProperty item: RadiusAuthenticatorProperty.values()) {
            MatcherAssert.assertThat(item.getValue(configProperties).get(), Matchers.is("propertyValue"));
        }
    }

    @Test
    public void getValue_should_return_empty_when_value_is_null() {
        Map<String, String> configProperties = Mockito.mock(Map.class);
        Mockito.when(configProperties.get(Mockito.any())).thenReturn(null);
        for (RadiusAuthenticatorProperty item: RadiusAuthenticatorProperty.values()) {
            MatcherAssert.assertThat(item.getValue(configProperties), Matchers.is(Optional.empty()));
        }
    }

}