# /app/package.json
nginx -c /app/nginx.conf &

export DEVELOPMENT=true

su user -c "npm install" &&
su user -c "./node_modules/.bin/webpack" &&
su user -c "./node_modules/.bin/forever --minUptime=1000 --spinSleepTime=10000 --colors=true forever/development.json" &
su user -c "./node_modules/.bin/webpack --watch"