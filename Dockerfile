FROM node:20.0.0-alpine3.17

# build webpack packages
ADD . /app
WORKDIR /app
RUN npm install
RUN npm run build

# build express server 
ENV NODE_ENV=production
WORKDIR /app/express
RUN npm install

EXPOSE 5000
WORKDIR /app/server
CMD ["node", "server.js"]
