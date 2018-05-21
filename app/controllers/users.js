/* eslint-disable consistent-return */
import users from '../services/users';

const getAllUsersRequest = async (ctx) => {
  try {
    await users.getAllUsers().then((k) => {
      const data = k;
      ctx.body = data;
      return ctx;
    });
  } catch (err) {
    ctx.res.internalServerError(500, 'Oops, something went wrong.', {});
    return ctx;
  }
};

const addNewUserRequest = async (ctx) => {
  try {
    await users.createUser(ctx.request.body).then((k) => {
      const data = k;
      ctx.body = data;
      return ctx;
    });
  } catch (err) {
    if (err.code === 422) {
      ctx.res.unprocessableEntity(422, err.message, err.data);
      return ctx;
    }

    ctx.res.internalServerError(500, 'Oops, something went wrong.', {});
    return ctx;
  }
};

const getUserByIdRequest = async (ctx) => {
  try {
    await users.getUserById(ctx).then((k) => {
      const data = k;
      ctx.body = data;
      return ctx;
    });
  } catch (err) {
    ctx.res.internalServerError(500, 'Oops, something went wrong.', {});
    return ctx;
  }
};

const deleteUserRequest = async (ctx) => {
  try {
    await users.deleteUser(ctx).then((k) => {
      const data = k;
      ctx.body = data;
      return ctx;
    });
  } catch (err) {
    ctx.res.internalServerError(500, 'Oops, something went wrong.', {});
    return ctx;
  }
};

const fullyUpdateUserRequest = async (ctx) => {
  try {
    await users.updateUser(ctx).then((k) => {
      const data = k;
      ctx.body = data;
      return ctx;
    });
  } catch (err) {
    ctx.res.internalServerError(500, 'Oops, something went wrong.', {});
    return ctx;
  }
};

const partiallyUpdateUserRequest = async (ctx) => {
  try {
    await users.patchUser(ctx).then((k) => {
      const data = k;
      ctx.body = data;
      return ctx;
    });
  } catch (err) {
    ctx.res.internalServerError(500, 'Oops, something went wrong.', {});
    return ctx;
  }
};

module.exports = {
  getAllUsersRequest,
  addNewUserRequest,
  getUserByIdRequest,
  deleteUserRequest,
  fullyUpdateUserRequest,
  partiallyUpdateUserRequest,
};
