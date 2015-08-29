from base/archlinux:latest

MAINTAINER Bjørn Uhre Arnholtz

RUN\
    echo "Server = http://mirror.one.com/archlinux/\$repo/os/\$arch" > /etc/pacman.d/mirrorlist &&\
    pacman -Syy --noconfirm &&\
    pacman -S openssl pacman --noconfirm &&\
    pacman-db-upgrade &&\
    pacman-key --populate archlinux &&\
    pacman-key --refresh-keys &&\
    pacman -Su --noconfirm \
        python2 python2-virtualenv base-devel postgresql vim htop man

RUN (\
    sudo -u postgres initdb --locale en_US.UTF-8 -E UTF8 -D '/var/lib/postgres/data' -A trust &&\
    groupadd sudo &&\
    echo "%sudo ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/sudo-group &&\
    useradd developer &&\
    usermod -aG sudo developer &&\
    cp -R /etc/skel/ /home/developer/ &&\
    mkdir -p /app/src &&\
    chown -R developer.developer /app /home/developer/ \
)

RUN (\
    echo "host all all 0.0.0.0/0 trust" >> /var/lib/postgres/data/pg_hba.conf &&\
    echo "listen_addresses = '0.0.0.0'" >> /var/lib/postgres/data/postgresql.conf \
)



USER developer

CMD (cd /app && ./src/bash/boot_docker.sh)
