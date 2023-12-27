FROM node:20.10-alpine3.19
ENV appDir /usr/app

COPY express ${appDir}/express
WORKDIR ${appDir}/express
RUN yarn install

# add webpack generated files
COPY build ${appDir}

EXPOSE 5000
WORKDIR ${appDir}/express
CMD ["node", "server.js"]