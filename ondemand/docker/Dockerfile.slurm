ARG SLURM_TAG

FROM hmdc/slurm-docker-cluster:${SLURM_TAG}

ARG OOD_UID=3210
ARG OOD_GID=3210

RUN groupadd -g $OOD_GID ood || : && \
    useradd -u $OOD_UID --create-home --gid $OOD_GID ood && \
    echo -n "ood" | passwd --stdin ood && \
    wget https://turbovnc.org/pmwiki/uploads/Downloads/TurboVNC.repo && \
    mv TurboVNC.repo /etc/yum.repos.d/ && \
    curl -L https://download2.rstudio.org/rstudio-server-rhel-1.1.463-x86_64.rpm -o rstudio-server-rhel-1.1.463-x86_64.rpm && \
    yum install -y epel-release && \
    yum install -y nc openssh-server turbovnc-2.2.5-20200507 R rstudio-server-rhel-1.1.463-x86_64.rpm && \
    python3.4 -m pip install --upgrade pip==18.0 && \
    python3.4 -m pip install websockify==0.10.0 && \
    yum -y groupinstall 'MATE Desktop' && \
    mkdir -p /apps && \
    mkdir -p /run/sshd && \
    ssh-keygen -A && \
    cd /apps && \
    echo auth-minimum-user-id=100 >> /etc/rstudio/rserver.conf && \
    singularity pull --name rserver-launcher-centos7.simg shub://OSC/centos7-launcher

COPY ./docker/with-ssh.sh /usr/local/bin/with-ssh.sh

