FROM node:alpine as builder
# automatically creates the dir and sets it as the current working dir
WORKDIR /usr/src/app
# this will allow us to run vite and other tools directly
# ENV PATH /usr/src/node_modules/.bin:$PATH

# inject all environment vars we'll need
# ARG VITE_BACKEND_URL
# expose the variable to the finished cotainer
# ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# use a more specific COPY, as this will include files like `Dockerfile`, we don't really need inside our containers.
# COPY . ./
COPY index.html ./
COPY vite.config.mjs ./
COPY src /usr/src/app/src/
COPY public /usr/src/app/public/

# FROM builder as dev
# CMD ["npm", "run", "dev"]

# FROM builder as prod-builder
RUN yarn build

FROM nginx:latest as prod
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/
ENV VITE_URL_API_PROJECTS=
ENV VITE_URL_API_USERS=
CMD ["nginx", "-g", "daemon off;"]
