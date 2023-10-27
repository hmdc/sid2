ARG SLURM_TAG

FROM hmdc/slurm-docker-cluster:${SLURM_TAG}

ARG OOD_UID=3210
ARG OOD_GID=3210

RUN groupadd -g $OOD_GID ood || : && \
    useradd -u $OOD_UID --create-home --gid $OOD_GID ood && \
    dnf install -y passwd && \
    echo -n "ood" | passwd --stdin ood && \
    wget https://turbovnc.org/pmwiki/uploads/Downloads/TurboVNC.repo && \
    mv TurboVNC.repo /etc/yum.repos.d/ && \
    curl -L https://download2.rstudio.org/rstudio-server-rhel-1.1.463-x86_64.rpm -o rstudio-server-rhel-1.1.463-x86_64.rpm && \
    yum install -y epel-release && \
    yum install -y nc openssh-server turbovnc-2.2.5-20200507 R rstudio-server-rhel-1.1.463-x86_64.rpm && \
    python -m pip install --upgrade pip==18.0 && \
    python -m pip install websockify==0.10.0 && \
    mkdir -p /apps && \
    mkdir -p /run/sshd && \
    ssh-keygen -A && \
    cd /apps && \
    echo auth-minimum-user-id=100 >> /etc/rstudio/rserver.conf && \
    singularity pull --name rserver-launcher-centos7.simg https://datasets.datalad.org/shub/OSC/centos7-launcher/latest/2021-04-19-02a3f1d4-b97ce30c/b97ce30c2b35f67b28d7a6830dca5bbe.simg

# EXPECTED LOCATION FOR WEBSOCKIFY
RUN ln -s /usr/local/bin/websockify /usr/bin/websockify
# INSTALL X11
RUN yum groupinstall -y "Xfce"
# INSTALL MATE DESKTOP
RUN dnf install -y mate-applets mate-backgrounds mate-calc mate-common mate-control-center mate-control-center-filesystem mate-desktop-configs mate-dictionary mate-disk-image-mounter mate-disk-usage-analyzer mate-icon-theme mate-media mate-menus mate-menus-preferences-category-menu mate-notification-daemon mate-panel mate-polkit mate-power-manager mate-screensaver mate-screenshot mate-search-tool mate-sensors-applet mate-session-manager mate-settings-daemon mate-system-log mate-system-monitor mate-terminal mate-themes mate-user-admin mate-user-guide mate-utils

COPY ./docker/with-ssh.sh /usr/local/bin/with-ssh.sh

