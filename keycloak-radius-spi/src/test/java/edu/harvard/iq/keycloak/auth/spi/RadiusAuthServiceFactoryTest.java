package edu.harvard.iq.keycloak.auth.spi;

import edu.harvard.iq.keycloak.auth.spi.config.HostnamesParser;
import edu.harvard.iq.keycloak.auth.spi.config.InvalidConfigurationException;
import edu.harvard.iq.keycloak.auth.spi.config.RadiusHost;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class RadiusAuthServiceFactoryTest {

    private final HostnamesParser hostnamesParser = Mockito.mock(HostnamesParser.class);
    private final RadiusAuthServiceFactory underTest = new RadiusAuthServiceFactory(hostnamesParser);

    private final RadiusHost RADIUS_HOST = new RadiusHost("hostname", Optional.of(9090));

    @Test(expected = InvalidConfigurationException.class)
    public void should_throw_exception_when_hostnames_not_provided() {
        Map<String , String> properties = new HashMap<>();
        properties.put(RadiusAuthenticatorProperty.SHARED_SECRET.getProviderProperty().getName(), "secret");

        underTest.createService(properties);
    }

    @Test(expected = InvalidConfigurationException.class)
    public void should_throw_exception_when_secret_not_provided() {
        Map<String , String> properties = new HashMap<>();
        properties.put(RadiusAuthenticatorProperty.HOSTNAMES.getProviderProperty().getName(), "server.com");

        underTest.createService(properties);
    }

    @Test(expected = InvalidConfigurationException.class)
    public void should_throw_exception_when_retries_is_invalid() {
        Mockito.when(hostnamesParser.parse(Mockito.any())).thenReturn(Arrays.asList(RADIUS_HOST));

        Map<String, String> properties = validProperties();
        properties.put(RadiusAuthenticatorProperty.CLIENT_RETRIES.getProviderProperty().getName(), "invalid");

        underTest.createService(properties);
    }

    @Test(expected = InvalidConfigurationException.class)
    public void should_throw_exception_when_timeout_is_invalid() {
        Mockito.when(hostnamesParser.parse(Mockito.any())).thenReturn(Arrays.asList(RADIUS_HOST));

        Map<String, String> properties = validProperties();
        properties.put(RadiusAuthenticatorProperty.CLIENT_TIMEOUT.getProviderProperty().getName(), "invalid");

        underTest.createService(properties);
    }

    @Test
    public void should_generate_a_RadiusAuthService_with_a_configured_RadiusClient_for_each_hostname() {
        RadiusHost host1 = new RadiusHost("radius1.com", Optional.of(8080));
        RadiusHost host2 = new RadiusHost("radius2.com", Optional.of(9090));
        Mockito.when(hostnamesParser.parse(Mockito.any())).thenReturn(Arrays.asList(host1, host2));

        RadiusAuthService result = underTest.createService(validProperties());
        MatcherAssert.assertThat(result.getClients().size(), Matchers.is(2));

        MatcherAssert.assertThat(result.getClients().get(0).getHostName(), Matchers.is(host1.getHostname()));
        MatcherAssert.assertThat(result.getClients().get(0).getAuthPort(), Matchers.is(host1.getPort()));
        MatcherAssert.assertThat(result.getClients().get(0).getRetryCount(), Matchers.is(10));
        MatcherAssert.assertThat(result.getClients().get(0).getSocketTimeout(), Matchers.is(5000));

        MatcherAssert.assertThat(result.getClients().get(1).getHostName(), Matchers.is(host2.getHostname()));
        MatcherAssert.assertThat(result.getClients().get(1).getAuthPort(), Matchers.is(host2.getPort()));
        MatcherAssert.assertThat(result.getClients().get(1).getRetryCount(), Matchers.is(10));
        MatcherAssert.assertThat(result.getClients().get(1).getSocketTimeout(), Matchers.is(5000));
    }

    private Map<String , String> validProperties() {
        Map<String , String> properties = new HashMap<>();
        properties.put(RadiusAuthenticatorProperty.HOSTNAMES.getProviderProperty().getName(), "server.com");
        properties.put(RadiusAuthenticatorProperty.SHARED_SECRET.getProviderProperty().getName(), "secret");
        properties.put(RadiusAuthenticatorProperty.CLIENT_RETRIES.getProviderProperty().getName(), "10");
        properties.put(RadiusAuthenticatorProperty.CLIENT_TIMEOUT.getProviderProperty().getName(), "5000");
        return properties;
    }

}