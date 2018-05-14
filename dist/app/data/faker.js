'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUsers = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_faker2.default.locale = 'en';

var numberOfUsers = 1000; // Replace with any number >= 1

var generateUsers = exports.generateUsers = function generateUsers() {

  var users = [];

  for (var i = 0; i < numberOfUsers; i++) {
    var firstName = _faker2.default.name.firstName();
    var lastName = _faker2.default.name.lastName();
    var username = firstName + '_' + lastName;

    users.push({
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: username + '@gmail.co.za',
      password: _faker2.default.internet.password(),
      cell: _faker2.default.phone.phoneNumber('+27#########'),
      status: 'active',
      deleted: false

    });
  }

  return users;
};
//# sourceMappingURL=faker.js.map