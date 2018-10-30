FROM node:10.12.0-alpine

ENV NODE_ENV production

RUN apk add --no-cache su-exec util-linux

ADD . /website
WORKDIR /website

# TODO: handle volumes
RUN apk add --no-cache --virtual .build-deps make gcc g++ libc-dev libpng-dev automake autoconf libtool python \
    && npm ci --quiet --no-audit --ignore-scripts \
    && npm run hydrate:json \
    && cd site \
    && SHARP_IGNORE_GLOBAL_LIBVIPS=1 && npm ci --quite --no-audit \
    && apk del .build-deps \
    && rm -fr /root/.npm /root/.node-gyp

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
