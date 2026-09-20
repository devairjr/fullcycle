FROM node:18.16.0-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY index.js ./

ENV DOCKERIZE_VERSION v0.15.1

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

CMD ["node", "index.js"]

EXPOSE 3000