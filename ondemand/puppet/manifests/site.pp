
node default {
  include openondemand

  $config_path = 'file:///tmp/sid/files'

  file { '/etc/ood/config/ondemand.d/fasrc.yml':
    ensure => present,
    path => '/etc/ood/config/ondemand.d/fasrc.yml',
    source => "${config_path}/ondemand.d/fasrc.yml",
    notify  => Class['openondemand::service'],
  }

  file { '/etc/ood/config/ondemand.d/sid.yml':
    ensure => present,
    path => '/etc/ood/config/ondemand.d/sid.yml',
    source => "${config_path}/ondemand.d/sid.yml",
    notify  => Class['openondemand::service'],
  }

  file { '/etc/ood/config/ondemand.d/support_ticket.yml':
    ensure => present,
    path => '/etc/ood/config/ondemand.d/support_ticket.yml',
    source => "${config_path}/ondemand.d/support_ticket.yml",
    notify  => Class['openondemand::service'],
  }

  file { '/etc/ood/config/apps/dashboard':
    ensure => directory,
    path => '/etc/ood/config/apps/dashboard',
    source => "${config_path}/application",
    recurse => 'remote',
    notify  => Class['openondemand::service'],
  }

  file { '/var/www/ood/public/images':
    ensure => directory,
    path => '/var/www/ood/public/images',
    source => "${config_path}/public/images",
    recurse => 'remote',
  }

    file { '/var/www/ood/public/css':
    ensure => directory,
    path => '/var/www/ood/public/css',
    source => "${config_path}/public/css",
    recurse => 'remote',
  }

}