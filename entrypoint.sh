#!/bin/sh
echo "chown volume /website/data..."
chown -R node:node /website/data
echo "First gatsby build..."
cd /website/site/ && su-exec node:node /website/site/node_modules/.bin/gatsby build
cd -
echo "Starting hydrate if required..."
[ ! -f data/people.json ] && npm run hydrate
echo "Starting server..."
su-exec node:node /usr/local/bin/npm start
