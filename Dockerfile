FROM node:10.12.0-alpine

ENV NODE_ENV production

RUN apk add --no-cache su-exec util-linux git rsync

ARG STATIC_URL="http://localhost:8000"
ENV GATSBY_WEBPACK_PUBLICPATH=${STATIC_URL}

COPY --chown=node:node . /website
WORKDIR /website

RUN apk add --no-cache --virtual .build-deps make gcc g++ libc-dev libpng-dev automake autoconf libtool python \
    && apk add vips-dev fftw-dev build-base --no-cache --update \
      --repository http://dl-3.alpinelinux.org/alpine/edge/community \
      --repository http://dl-3.alpinelinux.org/alpine/edge/main \
    && npm ci --quiet --no-audit --ignore-scripts \
    && ./node_modules/.bin/gatsby telemetry --disable \
    && cd site \
    && npm ci --quiet --no-audit \
    && apk del .build-deps \
    && rm -fr /root/.npm /root/.node-gyp

VOLUME /website/data

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN su-exec node:node git config --global user.email "bot@medialab.sciences-po.fr"
RUN su-exec node:node git config --global user.name "medialabot"

ENTRYPOINT ["/entrypoint.sh"]
