<div align="center">
  <br />
  <h1>COS 730 Users Submodule</h1>
  <h2>Benchmarking System</h2>
</div>
<br />

[![Build Status](https://travis-ci.org/cos730-2018-implementation-users/users-submodule.svg?branch=project-init)](https://travis-ci.org/cos730-2018-implementation-users/users-submodule)


Base Boilerplate: [koa-rest-api-boilerplate](https://github.com/posquit0/koa-rest-api-boilerplate)

## The API

A **LIVING** [Swagger API](https://swagger.io/) definition of this module is available [here](https://cos730-users.mjshika.xyz/api/users/v1/spec). You can either copy the content into a Swagger Editor or within the Swagger Editor, go to "File > Import url" and add this url: ``https://cos730-users.mjshika.xyz/api/users/v1/spec``. NB - the definition is in ``JSON`` format and not ``yaml``.

## Getting Started

```zsh
$ npm i
$ npm run start
```

Or with Docker

```zsh
$ docker-compose up -d --build
```

### Application Endpoints and Ports

#### Endpoints

A living version of the application is available for testing at [https://cos730-users.mjshika.xyz/api/users/v1/](https://cos730-users.mjshika.xyz/api/users/v1/). See the API definition above for available resources and routes.

#### Ports

* Dev: **8080**
* Prod: **8081**
* Test: **8082**

## Commands

### Run

```zsh
# Run normally
$ npm run start
# Run the application with nodemon for development
$ npm run dev
```

### Test

```zsh
# Test
$ npm run test                           # Run all test
$ npm run test:unit                      # Run only unit test
$ npm run test:integration               # Run only integration test
# Test (Watch Mode for development)
$ npm run test:watch                     # Run all test with watch mode
$ npm run test:watch:unit                # Run only unit test with watch mode
$ npm run test:watch:integration         # Run only integration test with watch mode
# Test Coverage
$ npm run test:coverage                  # Calculate the coverage of all test
$ npm run test:coverage:unit             # Calculate the coverage of unit test
$ npm run test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
$ npm run lint                           # Lint all sourcecode
$ npm run lint:app                       # Lint app sourcecode
$ npm run lint:test                      # Lint test sourcecode
```

