'use strict';

var getAllUsers = require('../services/database');

var data = void 0;

var getAllUsersRequest = function getAllUsersRequest(ctx) {
  var result = getAllUsers().then(function (k) {
    data = k;
    return data;
  });
  ctx.body = result;
  return ctx.body;
};

module.exports = {
  getAllUsersRequest: getAllUsersRequest
};
//# sourceMappingURL=users.js.map