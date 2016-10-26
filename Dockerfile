FROM node:6-slim

# Install app dependencies
RUN apt-get update -y
RUN apt-get install apt-utils bzip2 -y
RUN npm install -g yarn

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json yarn.lock /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm run webpack
RUN chmod -R +w /usr/src/app/log

VOLUME /usr/src/app/config /usr/src/app/log

EXPOSE 3000

CMD ["npm", "run", "start:www:prod"]
