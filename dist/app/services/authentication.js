'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = undefined;

/**
* Attemps to log a user into the system.
*/
var login = exports.login = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(db, username, password) {
    var cursor, user, errorResponse, _errorResponse, response, _errorResponse2, _errorResponse3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.query((0, _arangojs.aql)(_templateObject, username));

          case 3:
            cursor = _context.sent;
            _context.next = 6;
            return cursor.next();

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            errorResponse = {
              code: 401,
              message: 'Invalid username and/or password.',
              data: {}
            };
            return _context.abrupt('return', Promise.reject(errorResponse));

          case 10:
            if (!(user.status !== 'active')) {
              _context.next = 13;
              break;
            }

            _errorResponse = {
              code: 403,
              message: 'Your account is not active. Please contact support.',
              data: {}
            };
            return _context.abrupt('return', Promise.reject(_errorResponse));

          case 13:
            response = {
              result: _bcryptjs2.default.compareSync(password, user.password),
              data: new _userResponse2.default(user)
            };

            if (response.result) {
              _context.next = 17;
              break;
            }

            _errorResponse2 = {
              code: 401,
              message: 'Invalid username and/or password.',
              data: {}
            };
            return _context.abrupt('return', Promise.reject(_errorResponse2));

          case 17:
            return _context.abrupt('return', Promise.resolve(response));

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](0);
            _errorResponse3 = {
              code: 500,
              message: 'Internal server error occurred.',
              data: _context.t0
            };
            return _context.abrupt('return', Promise.reject(_errorResponse3));

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 20]]);
  }));

  return function login(_x, _x2, _x3) {
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


var logout = exports.logout = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // TODO - complete the logic of this function...

            ctx.res.ok('Successfully logged out.');
            return _context2.abrupt('return', next());

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function logout(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var _templateObject = _taggedTemplateLiteral(['\n      FOR u IN Users\n      FILTER u.email == ', '\n      RETURN u\n      '], ['\n      FOR u IN Users\n      FILTER u.email == ', '\n      RETURN u\n      ']);

var _arangojs = require('arangojs');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _userResponse = require('../mappers/userResponse');

var _userResponse2 = _interopRequireDefault(_userResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=authentication.js.map