node default {

  package { 'ruby:3.1':
    ensure      => present,
    provider    => dnfmodule,
    enable_only => true,
  }

  package { 'nodejs:18':
    ensure      => present,
    provider    => dnfmodule,
    enable_only => true,
  }

  include openondemand
  include sid2::ood_support_ticket

  # resource defaults from FASRC openondemand.pp
  File {
    ensure  => present,
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    require => Package[ondemand]
  }

  $config_path = 'file:///tmp/dashboard/files'

  if $openondemand::oidc_uri {
    file { '/opt/ood/ood-portal-generator/templates/ood-portal.conf.erb':
      source => "${config_path}/lib/ood-portal-generator/ood-portal-v3.0.conf.erb",
      notify    => Exec['ood-portal-generator-generate'],
    }
  }

  file { '/var/lib/ondemand-nginx/config/apps/sys/ood.conf':
      source     => "${config_path}/lib/ood-portal-generator/ood.conf",
      require    => Exec['nginx_stage-nginx_clean'],
  }

  file { ['/var/www/ood/apps/sys/dashboard/lib/ood_core',
          '/var/www/ood/apps/sys/dashboard/lib/ood_core/batch_connect',
          '/var/www/ood/apps/sys/dashboard/lib/ood_core/batch_connect/templates',]:
    ensure => directory,
  }

  file { '/var/www/ood/apps/sys/dashboard/lib/ood_core/batch_connect/templates/kvm.rb':
    source => "${config_path}/lib/ood_core/batch_connect/templates/kvm.rb",
  }

  file { '/var/www/ood/apps/sys/dashboard/lib/ood_core/batch_connect/templates/turbovnc.rb':
    source => "${config_path}/lib/ood_core/batch_connect/templates/turbovnc.rb",
  }

  exec { 'install_ood_ssh_key':
    command => '/usr/bin/sshpass -p ood /usr/bin/ssh-copy-id -o StrictHostKeyChecking=no -i /home/ood/.ssh/id_rsa.pub ood@slurmctld',
    user => 'ood',
    creates => '/home/ood/.ssh/ssh_key_installed',  # The command will only run if this file doesn't exist
  }

}
