
node default {
  $rt_server= "http://rt:34000"
  $rt_queues= ["General", "Internal:Logging"]
  $rt_api_user= "root"
  $rt_api_pass= "password"

  include openondemand

  $config_path = 'file:///tmp/dashboard/files'

  file { '/var/www/ood/apps/sys/dashboard/lib':
    ensure => directory,
    source => "${config_path}/lib",
    recurse => 'remote',
    notify  => Class['openondemand::service'],
    require => File['/var/www/ood/apps/sys/dashboard'],
  }

  file { '/var/www/ood/public/static':
    ensure => directory,
    source => "${config_path}/public/static",
    recurse => 'remote',
    require => File['/var/www/ood/public'],
  }

  file { "/etc/ood/config/clusters.d/dev-cluster.yml":
    ensure  => 'file',
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    source => "${config_path}/dev-cluster.yml",
    notify  => Class['openondemand::service'],
  }

  exec { 'install_ood_ssh_key':
    command => '/usr/bin/sshpass -p ood /usr/bin/ssh-copy-id -o StrictHostKeyChecking=no -i /home/ood/.ssh/id_rsa.pub ood@slurmctld',
    user => 'ood',
    creates => '/home/ood/.ssh/ssh_key_installed',  # The command will only run if this file doesn't exist
  }

}
