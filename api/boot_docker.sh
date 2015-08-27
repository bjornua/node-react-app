#!/bin/bash
sudo -u postgres postgres -D /var/lib/postgres/data/ &
./main.py