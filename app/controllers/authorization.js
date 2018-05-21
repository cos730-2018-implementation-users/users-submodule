import authorization from '../services/authorization';

const getAllRoles = async (ctx) => {
  await authorization.getAllRoles().then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const getRoleById = async (ctx) => {
  await authorization.getRoleById(ctx.request.body).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const getAllPermissions = async (ctx) => {
  await authorization.getAllPermissions().then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const getPermissionById = async (ctx) => {
  await authorization.getPermissionById(ctx.request.body).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

module.exports = {
  getAllRoles,
  getRoleById,
  getAllPermissions,
  getPermissionById,
};
