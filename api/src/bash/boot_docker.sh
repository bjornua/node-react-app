#!/bin/bash
sudo --background -u postgres postgres -D /var/lib/postgres/data/

function post_break {
    echo
    echo
    echo "To restart, run: /app/src/python/launcher.py"
    echo
    echo
    bash
    echo
    echo
    echo Shutting down postgres...
    sudo pkill -SIGTERM -u postgres -f "postgres -D /var/lib/postgres/data/"
    while
        pgrep -u postgres -f "postgres -D /var/lib/postgres/data/" > /dev/null
    do
        sleep 0.1s
    done;
    echo
    echo
    ps -A --forest

    echo 
    echo
    echo Ready for snapshot... Ctrl+C to exit
    echo
    set -e
    while true; do sleep 10m; done;
}




trap post_break INT


IPADDR=$(ip -4 addr show eth0 | grep -Eo "([0-9]+\\.){3}[0-9]+")

echo http://$IPADDR:5000/

/app/src/python/launcher.py $IPADDR