'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLogout = exports.userLogin = undefined;

/**
 * @swagger
 * /user/login:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Logs user into the system.
 *     operationId: userLogin
 *     parameters:
 *       - $ref: '#/parameters/basic_authorization'
 *     responses:
 *       200:
 *         description: Successfully logged-in
 *         schema:
 *           $ref: '#/definitions/AuthenticationResponse'
 *         headers:
 *           X-Expires-After:
 *             type: string
 *             format: date-time
 *             description: 'date in UTC when token expires'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       500:
 *         $ref: '#/responses/InternalServerError'
 */
var userLogin = exports.userLogin = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var authorisation, credentials, username, password, response, userObj;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (ctx.request.header.authorization) {
              _context.next = 4;
              break;
            }

            ctx.res.unauthorized('Authorization required.', {});
            return _context.abrupt('return', next());

          case 4:
            authorisation = ctx.request.header.authorization;

            if (authorisation.includes('Basic')) {
              _context.next = 8;
              break;
            }

            ctx.res.unauthorized('Basic authentication required.', {});
            return _context.abrupt('return', next());

          case 8:
            credentials = (0, _atob2.default)(authorisation.split(' ')[1]).split(':');
            username = credentials[0];
            password = credentials[1];
            _context.next = 13;
            return (0, _authentication.login)(ctx.db, username, password);

          case 13:
            response = _context.sent;
            userObj = JSON.parse(JSON.stringify(response.data));


            ctx.status = ctx.res.statusCodes.OK;
            ctx.body = {
              jwt: _jsonwebtoken2.default.sign(userObj, ctx.jwtSecret)
            };

            return _context.abrupt('return', next());

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](0);

            console.log('ERRR: ', _context.t0);

            if (!(_context.t0.code === 401)) {
              _context.next = 28;
              break;
            }

            ctx.res.unauthorized(_context.t0.message, _context.t0.data);
            return _context.abrupt('return', next());

          case 28:
            if (!(_context.t0.code === 403)) {
              _context.next = 31;
              break;
            }

            ctx.res.forbidden(_context.t0.message, _context.t0.data);
            return _context.abrupt('return', next());

          case 31:

            ctx.res.internalServerError(500, 'Oops, something went wrong.', {});
            return _context.abrupt('return', next());

          case 33:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 20]]);
  }));

  return function userLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @swagger
 * /user/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Logs out current logged in user session.
 *     parameters:
 *       - $ref: '#/parameters/bearer_authorization'
 *     operationId: userLogout
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContent'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       500:
 *         $ref: '#/responses/InternalServerError'
 */


var userLogout = exports.userLogout = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // TODO - complete the logic of this function...

            ctx.res.noContent({}, 'Successfully logged out.');
            return _context2.abrupt('return', next());

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function userLogout(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _atob = require('atob');

var _atob2 = _interopRequireDefault(_atob);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _authentication = require('../services/authentication');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=authentication.js.map