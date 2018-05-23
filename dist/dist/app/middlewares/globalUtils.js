'use strict';

var _arangojs = require('arangojs');

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

var db = new _arangojs.Database({
  // url: 'http://localhost:8529',
  url: 'http://cos.mjshika.xyz/db/users'
});

db.useBasicAuth('root', 'mysecretpassword');

function globalUtils() {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx.db = db;
              ctx.jwtSecret = 'HelloWorld99';
              _context.next = 4;
              return next();

            case 4:
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

module.exports = globalUtils;
//# sourceMappingURL=globalUtils.js.map
//# sourceMappingURL=globalUtils.js.map