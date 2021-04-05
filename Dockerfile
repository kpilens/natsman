## build image
FROM node:13.12.0-alpine


## add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

## set working directory
# WORKDIR /usr/src/node

WORKDIR /workspace

COPY package.json yarn.lock /workspace/

RUN yarn install

COPY . .

RUN yarn build
#make ARGs TO BE EXEC ENV
# ENV DEV_DB_SERVER_HOST=${DEV_DB_SERVER_HOST}
# ENV DEV_DB_SERVER_PORT=${DEV_DB_SERVER_PORT}
# ENV DEV_DB_SERVER_USERNAME=${DEV_DB_SERVER_USERNAME}
# ENV DEV_DB_SERVER_PASSWORD=${DEV_DB_SERVER_PASSWORD}
# ENV DEV_HASHINGSECRET=${DEV_HASHINGSECRET}
# ENV DEV_DATABASE=${DEV_DATABASE}
# ENV DEV_PORT=${DEV_PORT}


## build production app
EXPOSE 3000
ENV NODE_ENV production

# CMD ["node", "dist/main"]

CMD ["yarn", "run", "start:prod"]







## Setup production environment without cache ===============
# FROM node:13.12.0-alpine
# ENV NODE_ENV production


# ## copy build artifacts to Build

# WORKDIR /usr/src/app

# COPY --from=build /usr/src/node/package.json /usr/src/app/
# COPY --from=build /usr/src/node/dist /usr/src/app/dist/

# RUN yarn install


# ## export port 3000
# ENV PORT 3000
# EXPOSE 3000

# # CMD ["node", "dist/main"]
# CMD ["yarn", "run", "start:prod"]


# === __deprecrated
## Setup production environment without cache ===============
# FROM node:13.12.0-alpine
# ENV NODE_ENV production

# ## init env variables for app config
# ARG DB_SERVER_HOST=${DB_SERVER_HOST}
# ARG DB_SERVER_PORT=${DB_SERVER_PORT}
# ARG DB_SERVER_USERNAME=${DB_SERVER_USERNAME}
# ARG DB_SERVER_PASSWORD=${DB_SERVER_PASSWORD}
# ARG HASHINGSECRET=${HASHINGSECRET}
# ARG DATABASE=${DATABASE}
# ARG PORT=${PORT}


# # setup workdirectory and copy files
# WORKDIR /usr/src/app

# # ## install and cache app dependencies
# COPY package.json /usr/src/node/package.json


# # Install and build
# RUN yarn install


# COPY . /usr/src/app
# RUN yarn run build

# ## export port 3000
# EXPOSE 3000

# # RUN CI & TESTS
# # RUN yarn test

# # CMD ["node", "dist/main"]
# CMD ["yarn", "run", "start:prod"]

