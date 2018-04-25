#
# KOA REST API BOILERPLATE
#
# build:
#   docker build --force-rm -t posquit0/koa-rest-api-boilerplate .
# run:
#   docker run --rm --it --env-file=path/to/.env --name koa-rest-api-boilerplate -p 80:8081 posquit0/koa-rest-api-boilerplate
#
#

### BASE
# FROM node:8.9.4-alpine AS base
FROM keymetrics/pm2:latest-alpine AS base
# Set the working directory
WORKDIR /app
# Copy project specification and dependencies lock files
COPY package.json package-lock.json ./

### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies (only production)
RUN npm i --production
# Copy production dependencies aside
RUN cp -R node_modules /tmp/node_modules
# Install ALL Node.js dependencies
RUN npm i

### TEST
FROM dependencies AS test
# Copy app sources
COPY . .
# Run linters and tests
RUN npm run lint && npm run test


### RELEASE
FROM base AS release
# Copy production dependencies
COPY --from=dependencies /tmp/node_modules ./node_modules
# Copy app sources
COPY . .
# Expose application port
EXPOSE 8081
EXPOSE 9615
# In production environment
ENV NODE_ENV production
# Run
# TODO: Replace to PM2 after fixing PM2 memory leak bug
# CMD npm run pm2-runtime --env production --raw process.json | npm run bunyan
RUN npm i -g bunyan
CMD pm2-runtime --env production --raw pm2.config.js --web | bunyan
# CMD npm run pm2-start
# CMD pm2 start
# CMD npm run start
