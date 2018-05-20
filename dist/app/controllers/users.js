'use strict';

var users = require('../services/database');

var data = void 0;

var getAllUsersRequest = function getAllUsersRequest(ctx) {
  users.getAllUsers().then(function (k) {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

var addNewUserRequest = function addNewUserRequest(ctx) {
  users.createUser(ctx.request.body).then(function (k) {
    data = k._result;
  });
  ctx.body = data;
  return ctx;
};

var getUserByIdRequest = function getUserByIdRequest(ctx) {
  users.getUserById(ctx).then(function (k) {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

var deleteUserRequest = function deleteUserRequest(ctx) {
  users.deleteUser(ctx).then(function (k) {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

var fullyUpdateUserRequest = function fullyUpdateUserRequest(ctx) {
  users.updateUser(ctx).then(function (k) {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

var partiallyUpdateUserRequest = function partiallyUpdateUserRequest(ctx) {
  users.patchUser(ctx).then(function (k) {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

module.exports = {
  getAllUsersRequest: getAllUsersRequest,
  addNewUserRequest: addNewUserRequest,
  getUserByIdRequest: getUserByIdRequest,
  deleteUserRequest: deleteUserRequest,
  fullyUpdateUserRequest: fullyUpdateUserRequest,
  partiallyUpdateUserRequest: partiallyUpdateUserRequest
};
//# sourceMappingURL=users.js.map