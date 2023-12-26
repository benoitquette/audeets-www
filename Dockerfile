FROM node:20.0.0-alpine3.19 as builder

ADD . /app
WORKDIR /app
RUN npm install
RUN npm run build


FROM node:20.0.0-alpine3.19 as runner
ENV NODE_ENV=production

ADD ./express /app/express
COPY --from=builder /app/build /app/build

WORKDIR /app/express
RUN npm install

EXPOSE 5000
CMD ["node", "express/server.js"]
