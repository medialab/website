# Building sharp
# FROM alpine:edge as vips
# COPY site/package.json package.json
# COPY site/package-lock.json package-lock.json

# RUN set -x && \
#   apk add --no-cache nodejs nodejs-npm

# RUN set -x && \
#   apk add vips-dev fftw-dev build-base python --no-cache \
#     --repository https://alpine.global.ssl.fastly.net/alpine/edge/community/

# RUN set -x && \
#   npm set progress=false && \
#   npm config set depth 0 && \
#   npm ci --quiet --no-audit

# Main container
FROM node:10.12.0-alpine

ENV NODE_ENV production
ENV BABEL_CACHE_PATH /website
ENV BABEL_DISABLE_CACHE 1
ENV DISABLE_SHARP_CACHE 1

RUN apk add --no-cache su-exec util-linux git rsync

COPY --chown=node:node . /website
# COPY --chown=node:node --from=vips node_modules/sharp /website/site/node_modules/sharp
WORKDIR /website

RUN apk add vips fftw --no-cache \
      --repository https://alpine.global.ssl.fastly.net/alpine/edge/community/ \
      --repository https://alpine.global.ssl.fastly.net/alpine/edge/main/ \
    && npm ci --quiet --no-audit \
    && rm -fr /root/.npm /root/.node-gyp /root/.config /usr/lib/node_modules

VOLUME /website/data

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN su-exec node:node git config --global user.email "bot@medialab.sciences-po.fr"
RUN su-exec node:node git config --global user.name "medialabot"

ENTRYPOINT ["/entrypoint.sh"]
