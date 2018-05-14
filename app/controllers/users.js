const getAllUsers = require('../services/database');

let data;

const getAllUsersRequest = (ctx) => {
  const result = getAllUsers().then((k) => {
    data = k;
    return data;
  });
  ctx.body = result;
  return ctx.body;
};

module.exports = {
  getAllUsersRequest,
};
