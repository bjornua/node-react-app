from base/archlinux:latest

RUN pacman -Syu --noconfirm nodejs nginx

RUN \
    useradd user -m -d /home/user

WORKDIR /app

CMD bash boot_docker.sh
