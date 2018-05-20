const users = require('../services/database');

let data;

const getAllUsersRequest = (ctx) => {
  // Check if request is valid
  users.getAllUsers().then((k) => {
    data = k;
  });
  ctx.body = data;
  return ctx.body;
};

const example = {
  username: 'Erin_Gleichner2',
  firstName: 'Erin2',
  lastName: 'Gleichner2',
  email: 'Erin_Gleichne2r@gmail.co.za',
  password: 'hPKMLUX91fupwa6',
  cell: '+27956707758',
  status: 'active',
  deleted: false,
};

const addNewUserRequest = (ctx) => {
  // Check if request is valid

  users.createUser(example).then((k) => {
    data = k._result;
  });
  ctx.body = data;
  return ctx.body;
};

const getUserByIdRequest = (ctx) => {
  users.getUserById(ctx).then((k) => {
    data = k;
  });
  ctx.body = data;
  console.log(ctx.body);
  return ctx.body;
};

module.exports = {
  getAllUsersRequest,
  addNewUserRequest,
  getUserByIdRequest,
};
