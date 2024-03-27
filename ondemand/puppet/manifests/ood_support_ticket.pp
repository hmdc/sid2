# Class to configure the support ticket RT configuration for OnDemand
class sid2::ood_support_ticket (
  Optional[String] $rt_server = undef,
  Optional[Array] $rt_queues = [],
  Optional[String] $rt_api_user = undef,
  Optional[String] $rt_api_pass = undef,
  Optional[String] $rt_priority = '4',
  Optional[String] $rt_proxy_server = undef,
){

  if ($rt_server) {
    file { '/etc/ood/config/ondemand.d/support_ticket.yml':
      ensure  => 'file',
      owner   => 'root',
      group   => 'root',
      mode    => '0644',
      #content => template('puppet:///modules/profile/openondemand/common/ondemand.d/support_ticket.yml.erb'),
      content => template('/tmp/dashboard/files/ondemand.d/support_ticket.yml.erb'),
    }
  }
}
