FROM node:20-alpine
ENV appDir /usr/src/app
# ENV yarnDir /root/.yarn/bin

# install Yarn
# RUN npm install --global yarn

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p ${appDir} && cp -a /tmp/node_modules ${appDir}/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR ${appDir}
COPY . ${appDir}
RUN ${yarnDir}/yarn build
# VOLUME ${appDir}/config

EXPOSE 5000
WORKDIR ${appDir}/express
CMD ["node", "server.js"]