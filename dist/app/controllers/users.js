'use strict';

var users = require('../services/database');

var data = void 0;

var getAllUsersRequest = function getAllUsersRequest(ctx) {
  // Check if request is valid
  users.getAllUsers().then(function (k) {
    data = k;
  });
  ctx.body = data;
  return ctx.body;
};

var example = {
  username: 'Erin_Gleichner2',
  firstName: 'Erin2',
  lastName: 'Gleichner2',
  email: 'Erin_Gleichne2r@gmail.co.za',
  password: 'hPKMLUX91fupwa6',
  cell: '+27956707758',
  status: 'active',
  deleted: false
};

var addNewUserRequest = function addNewUserRequest(ctx) {

  // Check if request is valid

  users.createUser(example).then(function (k) {
    data = k._result;
  });
  ctx.body = data;
  return ctx.body;
};

var getUserByIdRequest = function getUserByIdRequest(ctx) {

  // Check if request is valid

  users.getUserById(ctx).then(function (k) {
    data = k;
  });
  ctx.body = data;
  console.log(ctx.body);
  return ctx.body;
};

// const updateUser

module.exports = {
  getAllUsersRequest: getAllUsersRequest,
  addNewUserRequest: addNewUserRequest,
  getUserByIdRequest: getUserByIdRequest
};
//# sourceMappingURL=users.js.map