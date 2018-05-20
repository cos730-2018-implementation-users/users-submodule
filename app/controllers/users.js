import users from '../services/users';

const getAllUsersRequest = async (ctx) => {
  await users.getAllUsers().then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const addNewUserRequest = async (ctx) => {
  await users.createUser(ctx.request.body).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const getUserByIdRequest = async (ctx) => {
  await users.getUserById(ctx).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const deleteUserRequest = async (ctx) => {
  await users.deleteUser(ctx).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const fullyUpdateUserRequest = async (ctx) => {
  await users.updateUser(ctx).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const partiallyUpdateUserRequest = async (ctx) => {
  await users.patchUser(ctx).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

module.exports = {
  getAllUsersRequest,
  addNewUserRequest,
  getUserByIdRequest,
  deleteUserRequest,
  fullyUpdateUserRequest,
  partiallyUpdateUserRequest,
};
