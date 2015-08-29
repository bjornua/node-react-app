#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

if ! $(docker inspect lindo-api > /dev/null); then
    docker build -t lindo-api .
fi




docker run \
    -p 127.0.0.1:5000:5000 \
    -p 127.0.0.1:5432:5432 \
    --name=lindo-api \
    --rm \
    -tiv $DIR/src:/app/src:ro lindo-api

