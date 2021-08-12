package edu.harvard.iq.keycloak.auth.spi.config;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.Test;

import java.util.List;

public class HostnamesParserTest {

    private final HostnamesParser underTest = new HostnamesParser();

    @Test
    public void parse_should_parse_multiple_hostnames_separated_by_coma() {
        String hostnames = "server1.com:8080,server2.net:9090";

        List<RadiusHost> result = underTest.parse(hostnames);

        MatcherAssert.assertThat(result.size(), Matchers.is(2));
        MatcherAssert.assertThat(result.get(0).getHostname(), Matchers.is("server1.com"));
        MatcherAssert.assertThat(result.get(0).getPort(), Matchers.is(8080));

        MatcherAssert.assertThat(result.get(1).getHostname(), Matchers.is("server2.net"));
        MatcherAssert.assertThat(result.get(1).getPort(), Matchers.is(9090));
    }

    @Test
    public void getPort_should_return_default_port_when_no_port_is_specified() {
        String hostnames = "server.com";

        List<RadiusHost> result = underTest.parse(hostnames);

        MatcherAssert.assertThat(result.size(), Matchers.is(1));
        MatcherAssert.assertThat(result.get(0).getHostname(), Matchers.is("server.com"));
        MatcherAssert.assertThat(result.get(0).getPort(), Matchers.is(RadiusHost.DEFAULT_PORT));
    }

    @Test(expected = InvalidConfigurationException.class)
    public void parse_should_throw_InvalidConfigurationException_when_invalid_hostname() {
        String hostnames = "@#¢%.com";

        underTest.parse(hostnames);
    }

    @Test
    public void parse_should_return_empty_list_when_null_hostnames() {
        List<RadiusHost> result = underTest.parse(null);
        MatcherAssert.assertThat(result.isEmpty(), Matchers.is(true));
    }

    @Test
    public void parse_should_return_empty_list_when_empty_hostnames() {
        List<RadiusHost> result = underTest.parse("");
        MatcherAssert.assertThat(result.isEmpty(), Matchers.is(true));
    }

}