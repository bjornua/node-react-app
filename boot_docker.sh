# /app/package.json
su user -c "npm install" &&
nginx -c /app/nginx.conf &&
su user -c "npm start"
