# Templating the NGINX conf
envsubst '\$HOST \$PORT' < /etc/nginx/conf.d/docker.template > /etc/nginx/conf.d/default.conf

# No daemon
nginx -g 'daemon off;'
