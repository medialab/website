# Templating the NGINX conf
envsubst '\$API_HOST \$API_PORT \$STATIC_HOST \$STATIC_PORT' < /etc/nginx/conf.d/docker.template > /etc/nginx/conf.d/default.conf

# No daemon
nginx -g 'daemon off;'
