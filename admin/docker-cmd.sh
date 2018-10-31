# Templating the NGINX conf
envsubst '\$API_URL \$STATIC_URL' < /etc/nginx/conf.d/docker.template > /etc/nginx/conf.d/default.conf

# No daemon
nginx -g 'daemon off;'
