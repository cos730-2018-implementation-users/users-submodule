import authorization from '../services/authorization';

const getAllRoles = async (ctx) => {
  await authorization.getAllRoles(ctx.db).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const getRoleById = async (ctx) => {
  await authorization.getRoleById(ctx.db, ctx.params.roleId).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const getAllPermissions = async (ctx) => {
  await authorization.getAllPermissions(ctx.db).then((k) => {
    const data = k;
    ctx.body = data;
    return ctx;
  });
};

const getPermissionById = async (ctx) => {
  await authorization.getPermissionById(ctx.db, ctx.params.permissionId).then((k) => {
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
