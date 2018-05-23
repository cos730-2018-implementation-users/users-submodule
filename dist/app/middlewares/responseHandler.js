'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * HTTP Status codes
 */
var statusCodes = {
  CONTINUE: 100,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIME_OUT: 504
};

function responseHandler() {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx.res.statusCodes = statusCodes;
              ctx.statusCodes = ctx.res.statusCodes;

              ctx.res.success = function () {
                var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                ctx.status = ctx.status < 400 ? ctx.status : statusCodes.OK;
                ctx.body = { status: 'success', data: data, message: message };
              };

              ctx.res.fail = function () {
                var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

                ctx.status = ctx.status >= 400 && ctx.status < 500 ? ctx.status : statusCodes.BAD_REQUEST;
                ctx.body = {
                  status: 'fail', code: code, data: data, message: message
                };
              };

              ctx.res.error = function () {
                var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

                ctx.status = ctx.status < 500 ? statusCodes.INTERNAL_SERVER_ERROR : ctx.status;
                ctx.body = {
                  status: 'error', code: code, data: data, message: message
                };
              };

              ctx.res.ok = function (data, message) {
                ctx.status = statusCodes.OK;
                ctx.res.success(data, message);
              };

              ctx.res.created = function (data, message) {
                ctx.status = statusCodes.CREATED;
                ctx.res.success(data, message);
              };

              ctx.res.accepted = function (data, message) {
                ctx.status = statusCodes.ACCEPTED;
                ctx.res.success(data, message);
              };

              ctx.res.noContent = function (data, message) {
                ctx.status = statusCodes.NO_CONTENT;
                ctx.res.success(data, message);
              };

              ctx.res.badRequest = function (code, message, data) {
                ctx.status = statusCodes.BAD_REQUEST;
                ctx.res.fail(code, message, data);
              };

              ctx.res.unauthorized = function (message, data) {
                ctx.status = statusCodes.UNAUTHORIZED;
                ctx.res.fail(ctx.status, message, data);
              };

              ctx.res.forbidden = function (code, message, data) {
                ctx.status = statusCodes.FORBIDDEN;
                ctx.res.fail(code, message, data);
              };

              ctx.res.notFound = function (code, message, data) {
                ctx.status = statusCodes.NOT_FOUND;
                ctx.res.fail(code, message, data);
              };

              ctx.res.requestTimeout = function (code, message, data) {
                ctx.status = statusCodes.REQUEST_TIMEOUT;
                ctx.res.fail(code, message, data);
              };

              ctx.res.unprocessableEntity = function (code, message, data) {
                ctx.status = statusCodes.UNPROCESSABLE_ENTITY;
                ctx.res.fail(code, message, data);
              };

              ctx.res.internalServerError = function (code, message, data) {
                ctx.status = statusCodes.INTERNAL_SERVER_ERROR;
                ctx.res.error(code, message, data);
              };

              ctx.res.notImplemented = function (code, message, data) {
                ctx.status = statusCodes.NOT_IMPLEMENTED;
                ctx.res.error(code, message, data);
              };

              ctx.res.badGateway = function (code, message, data) {
                ctx.status = statusCodes.BAD_GATEWAY;
                ctx.res.error(code, message, data);
              };

              ctx.res.serviceUnavailable = function (code, message, data) {
                ctx.status = statusCodes.SERVICE_UNAVAILABLE;
                ctx.res.error(code, message, data);
              };

              ctx.res.gatewayTimeOut = function (code, message, data) {
                ctx.status = statusCodes.GATEWAY_TIME_OUT;
                ctx.res.error(code, message, data);
              };
              _context.next = 22;
              return next();

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

module.exports = responseHandler;
//# sourceMappingURL=responseHandler.js.map