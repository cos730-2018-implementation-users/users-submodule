#!/usr/bin/env node
'use strict';

// Load APM on production environment
var config = require('./config');

var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var cors = require('kcors');
var errorHandler = require('./middlewares/errorHandler');
var logMiddleware = require('./middlewares/log');
var logger = require('./logger');
var requestId = require('./middlewares/requestId');
var responseHandler = require('./middlewares/responseHandler');
var router = require('./routes');

var app = new Koa();

// Trust proxy
app.proxy = true;

// Set middlewares
app.use(bodyParser({
  enableTypes: ['json', 'form'],
  formLimit: '10mb',
  jsonLimit: '10mb'
}));
app.use(requestId());
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
  exposeHeaders: ['X-Request-Id']
}));
app.use(responseHandler());
app.use(errorHandler());
app.use(logMiddleware({ logger: logger }));

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

function onError(err) {
  logger.error({ err: err, event: 'error' }, 'Unhandled exception occured');
}

// Handle uncaught errors
app.on('error', onError);

// Start server
if (!module.parent) {
  var server = app.listen(config.port, config.host, function () {
    logger.info({ event: 'execute' }, 'API server listening on ' + config.host + ':' + config.port + ', in ' + config.env);
  });
  server.on('error', onError);
}

// Expose app
module.exports = app;
//# sourceMappingURL=index.js.map