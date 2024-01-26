FROM node:20.10-alpine3.19
ENV appDir /usr/app

# add webpack generated files from CI
COPY build ${appDir}/build

# install serve
WORKDIR ${appDir}
RUN npm i -g serve 

EXPOSE 3000
CMD ["serve", "build/"]