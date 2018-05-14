'use strict';

var _arangojs = require('arangojs');

var _arangojs2 = _interopRequireDefault(_arangojs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { generateUsers } from '../data/faker';
require('dotenv').config();

var db = new _arangojs2.default('http://localhost:8529');
// const basePath = 'cos730-users.mjshika.xyz/api/v0.0.1/';
console.log(process.env.ARANGODB_USERNAME);
db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD); // Might need to move this to env variables

// db.createDatabase('Users').then(
//   () => console.log('Database created'),
//   err => console.error('Failed to create database:', err),
// );

db.useDatabase('Users');

var collection = db.collection('UserDetails');

// // Create a user detail table/collection
// collection.create().then(
//   () => console.log('Collection created'),
//   err => console.error('Failed to create collection:', err),
// );
//
//
// // Populate with fake data
// collection.import(generateUsers()).then(
//   result => console.log('Import complete:', result),
//   err => console.error('Import failed:', err),
// );

// db.dropDatabase('Users');

var getAllUsers = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var cursor, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.query('FOR doc IN UserDetails RETURN doc');

          case 3:
            cursor = _context.sent;
            _context.next = 6;
            return cursor.all();

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
    }, _callee, this, [[0, 10]]);
  }));

  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}();

var createUsers = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var cursor;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return db.query('INSERT { name: "John Doe", gender: "m" } INTO UserDetails RETURN NEW');

          case 3:
            cursor = _context2.sent;
            return _context2.abrupt('return', console.log(cursor));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            throw new Error(_context2.t0);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function createUsers() {
    return _ref2.apply(this, arguments);
  };
}();

createUsers();
module.exports = { getAllUsers: getAllUsers };
//# sourceMappingURL=database.js.map