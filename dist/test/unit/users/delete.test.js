'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var users = require('../../../app/services/database');

var userId = '';

var testUser = {
  username: 'Test',
  firstName: 'Test 1',
  lastName: 'Test 2',
  email: 'test@test.com',
  password: '123456',
  cell: '0123456789',
  status: 'active',
  deleted: false
};

beforeAll(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return users.createUser(testUser).then(function (k) {
            userId = k._result[0]._key;
          }).catch(function (err) {
            throw new Error(err);
          });

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

test('Tests whether object is deleted', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var result;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return users.deleteUser(userId).then(function (k) {
            userId = k._result[0]._key;
            return k._result[0];
          });

        case 2:
          result = _context2.sent;

          expect(result).toBeDefined();
          expect(result._key).toBe(userId);
          expect(result.deleted).toBe(true);

        case 6:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

afterAll(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return users.deleteUserObject(userId).then(function (k) {
            return console.log('User deleted: ', k);
          }).catch(function (err) {
            throw new Error(err);
          });

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));
//# sourceMappingURL=delete.test.js.map