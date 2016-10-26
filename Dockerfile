FROM node:6-slim
ENV appDir /usr/src/app

# Install app dependencies
RUN apt-get update -y
RUN apt-get install apt-utils bzip2 -y
RUN npm install -g yarn

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p ${appDir} && cp -a /tmp/node_modules ${appDir}/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR ${appDir}
COPY . ${appDir}
RUN npm run webpack
RUN chmod -R +w ${appDir}/log

VOLUME ${appDir}/config ${appDir}/log

EXPOSE 3000

CMD ["npm", "run", "start:www:prod"]
