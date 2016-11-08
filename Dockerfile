FROM node:6-slim
ENV appDir /usr/src/app

# Install app dependencies
RUN apt-get update -y
RUN apt-get install apt-utils bzip2 libfontconfig -y

# install Yarn
RUN apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

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

EXPOSE 5000

CMD ["npm", "run", "start"]
