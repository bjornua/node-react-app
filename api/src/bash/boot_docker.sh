#!/bin/bash
sudo --background -u postgres postgres -D /var/lib/postgres/data/
IPADDR=$(ip -4 addr show eth0 | grep -Eo "([0-9]+\\.){3}[0-9]+")

trap true INT
/app/src/python/launcher.py $IPADDR

echo
echo
echo "To restart, run: /app/src/python/launcher.py $IPADDR"
echo
echo
bash
set -e
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
while true; do sleep 10m; done;