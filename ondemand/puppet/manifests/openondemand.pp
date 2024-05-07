# Class profile::openondemand
#
class profile::openondemand (
  #
  ## Required parameters
  #
  # cluster name; used as source subdir name for cluster-specific files (ideally same as static_custom_facts::custom_facts.cluster)
  String $cluster,
  #
  # cluster name used as filename in /etc/ood/config/clusters.d/${cluster_config_filename}; must match value of `cluster` in apps `form.yml`
  String $cluster_config_filename,
  #
  # destination path for ood_core batch_connect template kvm.rb (OOD version dependent)
  String $kvm_template_path,
  #
  # destination path for ood_core batch_connect template turbovnc.rb (OOD version dependent)
  String $turbovnc_template_path,
  #
  ## Optional parameters
  #
  # hide the default Remote Desktop (bc_desktop) app from users?
  Boolean $hide_default_remote_desktop_app = true,
  #
  # install and configure the Sid Dashboard app?
  Boolean $install_sid2 = true,
) {

  # This module from the OpenOnDemand developers does most of the installation and configuration
  include ::openondemand

  # resource defaults
  File {
    ensure  => present,
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    require => Package[ondemand]
  }

  include profile::openondemand::ood_support_ticket

  if ($install_sid2) {
    include ::sid2
    Class['::profile::openondemand']
    -> Class['::sid2']
  }

  ### General modifications

  # FIXME: There is a bug in ::openondemand (as of v2.x) where it installs the `ondemand` rpm which Requires the `mod_ldap` rpm, but fails to account for configuring it in its `apache.pp` where it configures other apache modules, with the result that the `mod_ldap` and `mod_authnz_ldap` configs are purged from `modules.conf.d` (since apache::purge_configs it true by default) and the modules do not load. We need these modules for LDAP auth, so here is a workaround to manage the configs. An alternative workaround might be to manage all of the apache configs directly (i.e. through ::profile::web::apache), but when I tried this it added a spurious `Listen 80` to `ports.conf` which conflicted with the `Listen` statements in the OOD Vhost config. The fix should be for ::openondemand to manage all the apache configs that it installs, but this will need to wait until we upgrade to OOD 3.x since the 2.x branch of the puppet module is no longer receiving updates.
  include apache::mod::ldap
  include apache::mod::authnz_ldap

  
  # Custom ood portal template to support multiple domains with OIDC auth
  # This can be removed when OSC releases a new version of OOD with these changes => 3.2.0+ version
  if $openondemand::oidc_uri {
    file { '/opt/ood/ood-portal-generator/templates/ood-portal.conf.erb':
      source => 'puppet:///modules/profile/openondemand/common/ood-portal-v3.0.conf.erb',
      notify    => Exec['ood-portal-generator-generate'],
    }
  }
  # Adds support for custom VNC templates for OODv3
  file { ['/var/www/ood/apps/sys/dashboard/lib/ood_core',
          '/var/www/ood/apps/sys/dashboard/lib/ood_core/batch_connect',
          '/var/www/ood/apps/sys/dashboard/lib/ood_core/batch_connect/templates',]:
    ensure => directory,
  }

  # add support for kvm in batch_connect
  #   FIXME: ::openondemand doesn't support configuring this. Find out if it could or if there is a better way to do this.
  file { $kvm_template_path:
    source => 'puppet:///modules/profile/openondemand/common/kvm.rb',
  }

  # add support for turbovnc and kvm in session panel
  #   FIXME: ::openondemand doesn't support configuring this. Find out if it could or if there is a better way to do this.
  #   FIXME: this file is delivered by an RPM as a non-configuration file and there might be a better way to override it
  file { '/var/www/ood/apps/sys/dashboard/app/views/batch_connect/sessions/_panel.html.erb':
    source => 'puppet:///modules/profile/openondemand/common/_panel.html.erb',
  }

  # add support for turbovnc in session panel connection tab
  #   FIXME: ::openondemand doesn't support configuring this. Find out if it could or if there is a better way to do this.
  file { '/var/www/ood/apps/sys/dashboard/app/views/batch_connect/sessions/connections/_turbovnc.html.erb':
    source => 'puppet:///modules/profile/openondemand/common/_turbovnc.html.erb',
  }

  # add support for kvm in session panel connection tab
  #   FIXME: ::openondemand doesn't support configuring this. Find out if it could or if there is a better way to do this.
  file { '/var/www/ood/apps/sys/dashboard/app/views/batch_connect/sessions/connections/_kvm.html.erb':
    source => 'puppet:///modules/profile/openondemand/common/_kvm.html.erb',
  }

  # add support for novnc kvm in session panel connection tab
  #   FIXME: ::openondemand doesn't support configuring this. Find out if it could or if there is a better way to do this.
  file { '/var/www/ood/apps/sys/dashboard/app/views/batch_connect/sessions/connections/_novnckvm.html.erb':
    source => 'puppet:///modules/profile/openondemand/common/_novnckvm.html.erb',
  }

  # modify the nginx_stage script that configures the per-user nginx
  #   FIXME: This file overwrites a non-config file from an RPM. It contains several hacks that should be generalized into solutions that can be contributed upstream. Raminder specifically needs to account for commit 87920fbce479f281e15c9a287ebf0c99fb6c021e.
  file { '/opt/ood/nginx_stage/lib/nginx_stage/views/pun_config_view.rb':
    source => 'puppet:///modules/profile/openondemand/common/pun_config_view.rb',
  }

  # custom footer
  #   FIXME: ::openondemand doesn't support configuring this. Find out if it could or if there is a better way to do this.
  #   FIXME: this file is delivered by an RPM as a non-configuration file and there might be a better way to override it
  file { '/var/www/ood/apps/sys/dashboard/app/views/layouts/_footer.html.erb':
    source => 'puppet:///modules/profile/openondemand/common/_footer.html.erb',
  }

  # header logo
  #   FIXME: ::openondemand only supports configuring files in the public web root by setting ::openondemand::public_files_repo_paths, which reads from a source path under the ::openondemand::apps_config_repo vcsrepo checkout, but we are using ::openondemand::apps_config_source instead of ::openondemand::apps_config_repo. Should we be using ::openondemand::apps_config_repo? Or should ::openondemand support configuring files in the public web by setting a ::openondemand::public_files_source as it currently does for apps_config, locales_config, and announcements_config? Possibly both, but preferably the latter.
  file { '/var/www/ood/public/logo_small_fasrc.png':
    source => 'puppet:///modules/profile/openondemand/common/logo_small_fasrc.png'
  }

  # message of the day logo
  file { '/var/www/ood/public/rc-logo-text_2017_sm.png':
    source => 'puppet:///modules/profile/openondemand/common/rc-logo-text_2017_sm.png',
  }

  # configure Announcements
  #   https://osc.github.io/ood-documentation/latest/customizations.html?highlight=announcements#announcements
  #   FIXME: :::openondemand only supports configuring Announcements by setting ::openondemand::announcements_config_source, which reads from an arbitrary source path, or ::openondemand::announcements_config_repo_path, which reads from a source path under the ::openondemand::apps_config_repo vcsrepo checkout. It does not support managing Announcements as its own vcsrepo. Should we merge the announcements repo into an app_config repo and use ::openondemand::apps_config_repo? Or should we put the announcements in the puppet repo (alongside the apps_config and locales_config dirs)? Or should we check out this vcsrepo to some other filesystem path and use it as the source for ::openondemand::announcements_config_source (in order to abstract it from the filesystem, in case the behavior of ::openondemand changes in the future)?
  #  FIXME: we might want to paramaterize the revision/branch, as was done on el7
  vcsrepo { 'Announcements':
    ensure   => latest,
    provider => 'git',
    source   => 'https://gitlab-int.rc.fas.harvard.edu/openondemand/announcements.git',
    revision => 'master',
    path     => '/etc/ood/config/announcements.d'
  }

  # hide built-in OOD Remote Desktop
  #   FIXME: ::openondemand doesn't support configuring this built-in app, only locally supplied apps. Furthermore, it prevents us from managing this app's installation directory by declaring it as a ::openondemand::install::app (via $base_apps in init.pp) -- and puppet does not permit two resources to manage the same file/directory --  so we have to hide its manifest.yml file instead.
  if ($hide_default_remote_desktop_app) {
    file { '/var/www/ood/apps/sys/bc_desktop/manifest.yml':
      mode   => '0700',
    }
  }

  ### Cluster-specific modifications

  # configure clusters.d manually
  #   FIXME: ::openondemand doesn't support modifying clusters.d YAML files the way we want -- see data/groups/openondemand.yaml for details
  file { "/etc/ood/config/clusters.d/${cluster_config_filename}":
    source => "puppet:///modules/profile/openondemand/${cluster}/cluster.yml",
  }

  # message of the day text
  #   https://osc.github.io/ood-documentation/latest/customizations.html?highlight=motd#message-of-the-day-motd
  #   FIXME: ::openondemand doesn't support configuring this. Find out if it could or if there is a better way to do this. (It does support supplying text for the maintenance page, so I think we can make a pretty good case for it also to configure the motd.) It's not well-suited to being grouped in with public_files or apps_config since those are cluster-agnostic and this is cluster-dependent.
  file { '/var/www/ood/apps/sys/dashboard/public/motd':
    source => "puppet:///modules/profile/openondemand/${cluster}/motd",
  }

  # add support for turbovnc in batch_connect -- this uses different ports depending on the cluster
  #   FIXME: ::openondemand doesn't support configuring this. Find out if it could or if there is a better way to do this.
  file { $turbovnc_template_path:
    source => "puppet:///modules/profile/openondemand/${cluster}/turbovnc.rb",
  }
}
