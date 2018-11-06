#!/bin/sh
chown -R node:node /website
echo "Starting hydrate:json..."
[ ! -f data/people.json ] && npm run hydrate:json
echo "Starting server..."
su-exec node:node /usr/local/bin/npm start
