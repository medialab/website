FROM node:10.12.0-alpine

ENV NODE_ENV production

RUN apk add --no-cache su-exec util-linux

ARG STATIC_URL="http://localhost:8000"
ENV GATSBY_WEBPACK_PUBLICPATH=${STATIC_URL}

ADD . /website
WORKDIR /website

RUN apk add --no-cache --virtual .build-deps make gcc g++ libc-dev libpng-dev automake autoconf libtool python \
    && npm ci --quiet --no-audit --ignore-scripts \
    && cd site \
    && SHARP_IGNORE_GLOBAL_LIBVIPS=1 && npm ci --quite --no-audit \
    && apk del .build-deps \
    && rm -fr /root/.npm /root/.node-gyp

VOLUME /website/data

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN chown -R node:node /website

ENTRYPOINT ["/entrypoint.sh"]
