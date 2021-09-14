FROM --platform=linux/amd64 ubuntu:latest
ENV APP_UID=5000
ENV APP_GID=5000
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
    apt-get -y upgrade && \
    apt-get -y install wget curl gnupg2 apt-transport-https systemd && \
    . /etc/os-release && \
    wget -q -O- https://downloads.opennebula.io/repo/repo.key | apt-key add - && \
    echo "deb https://downloads.opennebula.io/repo/6.0/Ubuntu/$VERSION_ID stable opennebula" > /etc/apt/sources.list.d/opennebula.list && \
    apt-get -y update && \
    apt-get -y install opennebula-tools gosu && \
    ln -s /usr/share/one/gems-dist /usr/share/one/gems && \
    addgroup app --gid $APP_GID && \
    adduser --disabled-password --gecos "" app --uid $APP_UID --gid $APP_GID 
COPY --chmod=775 entrypoint.sh /entrypoint.sh
USER app
RUN mkdir ~/.one && \
    touch ~/.one/one_auth
CMD ["bash"]    
