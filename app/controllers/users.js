const users = require('../services/database');

let data;

const getAllUsersRequest = (ctx) => {
  users.getAllUsers().then((k) => {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

const addNewUserRequest = (ctx) => {
  users.createUser(ctx.request.body).then((k) => {
    data = k._result;
  });
  ctx.body = data;
  return ctx;
};

const getUserByIdRequest = (ctx) => {
  users.getUserById(ctx.params.userid).then((k) => {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

const deleteUserRequest = (ctx) => {
  users.deleteUser(ctx.params.userid).then((k) => {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

const fullyUpdateUserRequest = (ctx) => {
  users.updateUser(ctx.params.userid, ctx.request.body).then((k) => {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

const partiallyUpdateUserRequest = (ctx) => {
  users.patchUser(ctx.params.userid, ctx.request.body).then((k) => {
    data = k;
  });
  ctx.body = data;
  return ctx;
};

module.exports = {
  getAllUsersRequest,
  addNewUserRequest,
  getUserByIdRequest,
  deleteUserRequest,
  fullyUpdateUserRequest,
  partiallyUpdateUserRequest,
};
