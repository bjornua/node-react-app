# /app/package.json
su user -c "npm install" &&
nginx -c /app/nginx.conf &&
su user -c "./node_modules/.bin/nodemon" &
su user -c "DEVELOPMENT=true ./node_modules/.bin/webpack --watch"
