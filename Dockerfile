FROM node:alpine as builder
WORKDIR /usr/src/app
# install packages
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
# copy source files
COPY index.html ./
COPY vite.config.mjs ./
COPY src /usr/src/app/src/
COPY public /usr/src/app/public/
RUN yarn build

FROM nginx:latest as prod
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
ENV VITE_URL_API_PROJECTS=
ENV VITE_URL_API_USERS=
# add user and password
# RUN apt-get install openssl
# RUN sh -c "echo -n '${username}:' >> /etc/nginx/.htpasswd"
# RUN sh -c "openssl passwd ${pwd} >> /etc/nginx/.htpasswd"
CMD ["nginx", "-g", "daemon off;"]
