#!/bin/sh
chown -R node:node /website
su-exec node:node /usr/local/bin/npm start
# cd admin
# su-exec node:node /usr/local/bin/npm start
