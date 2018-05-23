version: '2'

services:
  name-of-your-module:
    build:
      context: ./
      dockerfile: ./Dockerfile
    container_name: name-of-your-module
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
