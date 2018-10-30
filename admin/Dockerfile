FROM nginx:stable-alpine

ENV NODE_ENV production

ENV HOST localhost
ENV PORT 7000
ENV URL_PREFIX http://localhost:3000

# NOTE: builds in parent folder to link specs
ADD ./admin /admin
ADD ./specs /specs
WORKDIR /admin

RUN apk add --no-cache --virtual .build-deps git nodejs=8.9.3-r1 build-base python \
    && npm install --quiet --production false --no-audit \
    && npm run build \
    && apk del .build-deps \
    && rm -rf ./node_modules /root/.npm /root/.node-gyp /root/.config /usr/lib/node_modules

RUN rm /etc/nginx/conf.d/default.conf
COPY docker-nginx.conf /etc/nginx/conf.d/docker.template

CMD /bin/sh docker-cmd.sh
