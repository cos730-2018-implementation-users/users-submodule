'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var users = require('../../../app/services/database');

test('Returns all users from the db', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = expect;
          _context.next = 3;
          return users.getAllUsers().then(function (k) {
            return k.length;
          });

        case 3:
          _context.t1 = _context.sent;
          (0, _context.t0)(_context.t1).toBeGreaterThanOrEqual(1);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));
//# sourceMappingURL=all.test.js.map
