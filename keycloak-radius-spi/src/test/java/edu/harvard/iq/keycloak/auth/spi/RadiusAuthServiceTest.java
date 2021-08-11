package edu.harvard.iq.keycloak.auth.spi;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.tinyradius.util.RadiusClient;

import java.io.IOException;
import java.util.Arrays;
import java.util.UUID;

public class RadiusAuthServiceTest {

    private static final String USERNAME = UUID.randomUUID().toString();
    private static final String TOTP_TOKEN = UUID.randomUUID().toString();

    private RadiusClient client1;
    private RadiusClient client2;
    private RadiusAuthService underTest;

    @Before
    public void beforeEachTest() {
        client1 = Mockito.mock(RadiusClient.class);
        client2 = Mockito.mock(RadiusClient.class);

        underTest = new RadiusAuthService(Arrays.asList(client1, client2));

    }

    @Test
    public void should_try_all_RadiusClients_on_error() throws Exception {
        Mockito.when(client1.authenticate(Mockito.any(String.class), Mockito.any(String.class))).thenThrow(new IOException("IO Error"));
        Mockito.when(client2.authenticate(Mockito.any(String.class), Mockito.any(String.class))).thenThrow(new IOException("IO Error"));


        boolean result = underTest.radiusAuth(USERNAME, TOTP_TOKEN);
        MatcherAssert.assertThat(result, Matchers.is(false));

        Mockito.verify(client1).authenticate(USERNAME, TOTP_TOKEN);
        Mockito.verify(client2).authenticate(USERNAME, TOTP_TOKEN);
    }

    @Test
    public void should_stop_calling_RadiusClients_when_successful_response() throws Exception {
        Mockito.when(client1.authenticate(Mockito.any(String.class), Mockito.any(String.class))).thenReturn(false);

        boolean result = underTest.radiusAuth(USERNAME, TOTP_TOKEN);
        MatcherAssert.assertThat(result, Matchers.is(false));

        Mockito.verify(client1).authenticate(USERNAME, TOTP_TOKEN);
        Mockito.verifyNoInteractions(client2);
    }

    @Test
    public void should_use_response_from_last_RadiusClient() throws Exception {
        Mockito.when(client1.authenticate(Mockito.any(String.class), Mockito.any(String.class))).thenThrow(new IOException("IO Error"));
        Mockito.when(client2.authenticate(Mockito.any(String.class), Mockito.any(String.class))).thenReturn(true);

        boolean result = underTest.radiusAuth(USERNAME, TOTP_TOKEN);
        MatcherAssert.assertThat(result, Matchers.is(true));

        Mockito.verify(client1).authenticate(USERNAME, TOTP_TOKEN);
        Mockito.verify(client2).authenticate(USERNAME, TOTP_TOKEN);
    }
}