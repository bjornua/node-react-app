from base/archlinux:latest

RUN pacman -Sy --noconfirm npm nodejs nginx

RUN \
    useradd user -m -d /home/user

WORKDIR /app

CMD bash boot_docker.sh
