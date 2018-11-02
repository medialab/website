#!/bin/sh
chown -R node:node /website
[ ! -f data/people.json ] && npm run hydrate:json
su-exec node:node /usr/local/bin/npm start
