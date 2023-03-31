
node default {
  include openondemand

  $config_path = 'file:///tmp/dashboard/files'

  file { '/var/www/ood/apps/sys/dashboard/lib':
    ensure => directory,
    source => "${config_path}/lib",
    recurse => 'remote',
    notify  => Class['openondemand::service'],
    require => File['/var/www/ood/apps/sys/dashboard'],
  }

  file { '/var/www/ood/public/images':
    ensure => directory,
    source => "${config_path}/public/images",
    recurse => 'remote',
  }

    file { '/var/www/ood/public/css':
    ensure => directory,
    source => "${config_path}/public/css",
    recurse => 'remote',
  }

}