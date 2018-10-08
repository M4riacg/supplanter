FROM node:10.11-alpine

WORKDIR app

COPY package*.json /app/

RUN npm i

ADD . /app/

RUN node_modules/.bin/webpack

ENTRYPOINT ["node", "/app/dist/bundle.js"]