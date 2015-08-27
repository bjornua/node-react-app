from base/archlinux:latest

MAINTAINER Bjørn Uhre Arnholtz

RUN\
    echo "Server = http://mirror.one.com/archlinux/\$repo/os/\$arch" > /etc/pacman.d/mirrorlist &&\
    pacman -Syy --noconfirm &&\
    pacman -S openssl pacman --noconfirm &&\
    pacman-db-upgrade &&\
    pacman-key --populate archlinux &&\
    pacman-key --refresh-keys &&\
    pacman -Syu --noconfirm &&\
    pacman -S --noconfirm python2 python2-virtualenv postgresql

RUN pacman -S sudo vim --noconfirm
RUN sudo -u postgres initdb --locale en_US.UTF-8 -E UTF8 -D '/var/lib/postgres/data' -A trust

RUN \
    groupadd sudo &&\
    echo "%sudo ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/sudo-group

# Developers developers developers developers
RUN \
(\
    useradd developer &&\
    cp -R /etc/skel/ /home/developer/ &&\
    chown -R developer.developer /home/developer/ &&\
    usermod -aG sudo developer \
)

RUN pacman -S --noconfirm base-devel

USER developer

CMD (cd /home/developer/api && ./boot_docker.sh)
# RUN pacman -S dhcpcd --noconfirm