'use strict';

var _templateObject = _taggedTemplateLiteral(['RETURN DOCUMENT("UserDetails", ', ')'], ['RETURN DOCUMENT("UserDetails", ', ')']),
    _templateObject2 = _taggedTemplateLiteral(['INSERT ', ' IN UserDetails RETURN NEW'], ['INSERT ', ' IN UserDetails RETURN NEW']),
    _templateObject3 = _taggedTemplateLiteral(['UPDATE ', ' WITH { deleted: true } IN UserDetails RETURN NEW'], ['UPDATE ', ' WITH { deleted: true } IN UserDetails RETURN NEW']),
    _templateObject4 = _taggedTemplateLiteral(['REPLACE ', ' WITH ', ' IN UserDetails RETURN NEW'], ['REPLACE ', ' WITH ', ' IN UserDetails RETURN NEW']),
    _templateObject5 = _taggedTemplateLiteral(['UPDATE ', ' WITH ', ' IN UserDetails RETURN NEW'], ['UPDATE ', ' WITH ', ' IN UserDetails RETURN NEW']);

var _arangojs = require('arangojs');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();

var db = new _arangojs.Database('http://localhost:8529');
db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);

db.useDatabase('Users');

// Retrieve user by id
var getUserById = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
    var cursor, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.query((0, _arangojs.aql)(_templateObject, userId.params.userid));

          case 3:
            cursor = _context.sent;
            _context.next = 6;
            return cursor.next();

          case 6:
            result = _context.sent;
            return _context.abrupt('return', result);

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);
            throw new Error(_context.t0);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function getUserById(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Retrieve all users from db
var getAllUsers = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var cursor, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return db.query('FOR doc IN UserDetails RETURN doc');

          case 3:
            cursor = _context2.sent;
            _context2.next = 6;
            return cursor.all();

          case 6:
            result = _context2.sent;
            return _context2.abrupt('return', result);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);
            throw new Error(_context2.t0);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 10]]);
  }));

  return function getAllUsers() {
    return _ref2.apply(this, arguments);
  };
}();

// Insert user into db
var createUser = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user) {
    var cursor;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return db.query((0, _arangojs.aql)(_templateObject2, user));

          case 3:
            cursor = _context3.sent;
            return _context3.abrupt('return', cursor);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);
            throw new Error(_context3.t0);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function createUser(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// Delete user from DB
var deleteUser = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userId) {
    var cursor;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return db.query((0, _arangojs.aql)(_templateObject3, userId.params.userid));

          case 3:
            cursor = _context4.sent;
            return _context4.abrupt('return', cursor);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](0);
            throw new Error(_context4.t0);

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function deleteUser(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var updateUser = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(user) {
    var cursor;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return db.query((0, _arangojs.aql)(_templateObject4, user.params.userid, user.request.body));

          case 3:
            cursor = _context5.sent;
            return _context5.abrupt('return', cursor);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](0);
            throw new Error(_context5.t0);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function updateUser(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var patchUser = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(user) {
    var cursor;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return db.query((0, _arangojs.aql)(_templateObject5, user.params.userid, user.request.body));

          case 3:
            cursor = _context6.sent;
            return _context6.abrupt('return', cursor);

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6['catch'](0);
            throw new Error(_context6.t0);

          case 10:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function patchUser(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  getUserById: getUserById,
  deleteUser: deleteUser,
  patchUser: patchUser,
  updateUser: updateUser
};
//# sourceMappingURL=database.js.map