
node default {

  include ::ood_support_ticket
  include openondemand

  $config_path = 'file:///tmp/dashboard/files'

  file { '/var/www/ood/apps/sys/dashboard/lib':
    ensure => directory,
    source => "${config_path}/lib",
    recurse => 'remote',
    notify  => Class['openondemand::service'],
    require => File['/var/www/ood/apps/sys/dashboard'],
  }

  exec { 'install_ood_ssh_key':
    command => '/usr/bin/sshpass -p ood /usr/bin/ssh-copy-id -o StrictHostKeyChecking=no -i /home/ood/.ssh/id_rsa.pub ood@slurmctld',
    user => 'ood',
    creates => '/home/ood/.ssh/ssh_key_installed',  # The command will only run if this file doesn't exist
  }

}
