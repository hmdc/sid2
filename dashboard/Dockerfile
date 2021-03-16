ARG SLURM_TAG
ARG OOD_TAG

FROM snkattck/slurm-docker-cluster:${SLURM_TAG}

# Install Open On Demand, Singularity
RUN yum install -y net-tools openssh-server openssh-clients && \
    yum install -y https://yum.osc.edu/ondemand/1.8/ondemand-release-web-${OOD_TAG}.noarch.rpm && \
    yum install -y epel-release centos-release-scl lsof sudo httpd24-mod_ssl httpd24-mod_ldap && \
    yum -y update && \
    yum -y install --nogpgcheck ondemand && \
    mkdir -p /etc/ood/config/clusters.d && \
    mkdir -p /etc/ood/config/apps/shell

COPY ./ood_portal.yml /etc/ood/config/ood_portal.yml
RUN /opt/ood/ood-portal-generator/sbin/update_ood_portal && \
    systemctl enable httpd24-httpd && \
    scl enable httpd24 -- htdbm -bc /opt/rh/httpd24/root/etc/httpd/.htpasswd.dbm ood ood

COPY launch-httpd /usr/local/bin/
CMD ["/usr/local/bin/launch-httpd"]