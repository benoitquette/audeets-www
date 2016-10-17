FROM node:6-slim

# Create app directory
RUN mkdir -p /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
WORKDIR /usr/src/app
RUN apt-get update -y && apt-get install bzip2 -y
RUN npm install && npm run webpack && chmod -R +w /usr/src/app/log

VOLUME /usr/src/app/config
