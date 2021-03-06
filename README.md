<div align="center">
  <br />
  <h1>COS 730 Users Submodule</h1>
  <h2>Benchmarking System</h2>
</div>
<br />

[![Build Status](https://travis-ci.org/cos730-2018-implementation-users/users-submodule.svg?branch=project-init)](https://travis-ci.org/cos730-2018-implementation-users/users-submodule)


Base Boilerplate: [koa-rest-api-boilerplate](https://github.com/posquit0/koa-rest-api-boilerplate)

Latest Version: **0.0.1**

## The API

A **LIVING** [Swagger API](https://swagger.io/) definition of this module is available [here](http://cos.mjshika.xyz/api/users/spec). You can either copy the content into a [Swagger Editor](http://editor.swagger.io/) or within the Swagger Editor, go to "File > Import url" and add this url: ``http://cos.mjshika.xyz/api/users/spec``. The living version of the API definition will have APIs which are either already developed or are a work-in-progress. Note - the definition is in ``JSON`` format and not ``yaml``.

Alternatively, a static and more complete ``yaml`` based API definition is available [here](https://github.com/cos730-2018-implementation-users/users-submodule/blob/dev/api-definition.yml). Simply copying the contents of this file into a swagger editor should get you going.

> **NB**: The **static** API definition is optimistic, and not all APIs are implemented on the test application. However the API forms a contract of how things will be implemented. **Also, existing definitions may change, however this will be documented via releases and versions, and should ideally not be breaking changes.**

## Enhancements and Modifications

To request enhancements or modifications to this API, please [open an issue here](https://github.com/cos730-2018-implementation-users/users-submodule/issues/new) describing the changes you would like. Someone in the users team will then address your request.

## Getting Started

```zsh
$ npm i
$ npm run start
```

Or with Docker

```zsh
$ make init #Will create the required docker network. Only run once.
$ docker-compose up -d --build
```

### Application Endpoints and Ports

#### Endpoints

A living version of the application is available for testing at [http://cos.mjshika.xyz/api/users/](http://cos.mjshika.xyz/api/users/). See the API definition above for available resources and routes.

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

### Test Users

```json
[
	{
		"username":"Neddy",
		"email":"ned@stark.com",
		"password":"secret"
	},
	{
		"username":"Kaitlin",
		"email":"kaitlin@stark.com",
		"password":"secret"
	},
	{
		"username":"Arya",
		"email":"arya@stark.com",
		"password":"secret"
	},
	{
		"username":"John",
		"email":"john@stark.com",
		"password":"secret"
	},
	{
		"username":"Sansa",
		"email":"sansa@stark.com",
		"password":"secret"
	}
]
```
