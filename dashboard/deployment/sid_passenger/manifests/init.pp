class sid_passenger() {

  file { "/var/www/ood/apps/sys/sid":
    ensure => directory,
    owner  => 'root',
    group  => 'root',
    recurse => true,
    mode   => '0755',
    source => "puppet:///modules/sid_passenger/application";
  }

  file { "/var/lib/ondemand-nginx/config/apps/sys/sid.conf":
    ensure => file,
    owner  => 'root',
    group  => 'root',
    mode   => '0644',
    source => "puppet:///modules/sid_passenger/sid.conf";
  }
}