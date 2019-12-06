FROM node:8.9.3-alpine AS static_admin

# NOTE: builds in parent folder to link specs

ENV NODE_ENV production

ARG API_URL=http://localhost:3000
ENV API_URL=${API_URL}

ADD ./admin /admin
ADD ./specs /specs

WORKDIR /admin

RUN apk add --no-cache --virtual .build-deps git build-base python \
    && npm install --quiet --production false --no-audit \
    && npm run build \
    && apk del .build-deps \
    && rm -rf ./node_modules /root/.npm /root/.node-gyp /root/.config /usr/lib/node_modules

###

FROM nginx:alpine

RUN mkdir /admin

COPY --from=static_admin --chown=nginx:nginx /admin/build /admin/build
COPY --from=static_admin --chown=nginx:nginx /admin/index.html /admin/index.html
COPY --from=static_admin --chown=nginx:nginx /admin/docker-cmd.sh /admin/docker-cmd.sh

RUN rm /etc/nginx/conf.d/default.conf

COPY ./admin/docker-nginx.conf /etc/nginx/conf.d/docker.template

CMD /bin/sh /admin/docker-cmd.sh
