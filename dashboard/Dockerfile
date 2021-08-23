ARG SLURM_TAG

FROM snkattck/slurm-docker-cluster:${SLURM_TAG}

ARG OOD_UID=3210
ARG OOD_GID=3210
ARG OOD_TAG

# Install Open On Demand, Singularity
RUN yum install -y net-tools openssh-clients && \
    yum install -y https://yum.osc.edu/ondemand/2.0/ondemand-release-web-2.0-1.noarch.rpm && \
    yum install -y epel-release centos-release-scl lsof sudo httpd24-mod_ssl httpd24-mod_ldap && \
    yum -y update && \
    yum -y install --nogpgcheck ondemand-${OOD_TAG} && \
    mkdir -p /etc/ood/config/clusters.d && \
    mkdir -p /etc/ood/config/apps/shell

COPY ./ood_portal.yml ./nginx_stage.yml /etc/ood/config/
RUN /opt/ood/ood-portal-generator/sbin/update_ood_portal && \
    systemctl enable httpd24-httpd && \
    groupadd -g $OOD_GID ood || : && \
    useradd -u $OOD_UID --create-home --gid $OOD_GID ood && \
    mkdir -p /home/ood/ondemand/data && \
    chown -R ${OOD_UID}:${OOD_GID} /home/ood && \
    echo -n "ood" | passwd --stdin ood && \
    scl enable httpd24 -- htdbm -bc /opt/rh/httpd24/root/etc/httpd/.htpasswd.dbm ood ood

COPY launch-httpd /usr/local/bin/
CMD ["/usr/local/bin/launch-httpd"]
