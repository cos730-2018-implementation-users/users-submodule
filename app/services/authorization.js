/* eslint-disable no-underscore-dangle */
import { Database, aql } from 'arangojs';
import RoleResponse from '../mappers/roleResponse';
import PermissionResponse from '../mappers/permissionResponse';

require('dotenv').config();

const db = new Database({
  // url: process.env.ARANGODB_HOST,
  url: 'http://users-db:8529',
});
// db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);
db.useBasicAuth('root', 'mysecretpassword');

db.useDatabase('Users');

const getAllRoles = async () => {
  try {
    // Get the roles...
    const rolesCursor = await db.query(aql`FOR doc IN Roles RETURN doc`);
    const dbRoles = await rolesCursor.all();

    // Get the permissions...
    const permissionsCursor = await db.query(aql`FOR doc IN Permissions RETURN doc`);
    const dbPermissions = await permissionsCursor.all();

    // Map each user resposne
    for (let i = 0; i < dbRoles.length; i += 1) {
      dbRoles[i] = new RoleResponse(dbRoles[i], dbPermissions);
    }

    return dbRoles;
  } catch (err) {
    throw new Error(err);
  }
};

const getRoleById = async (roleId) => {
  try {
    const cursor = await db.query(aql`RETURN DOCUMENT("Roles", ${roleId.params.roleId})`);
    const result = await cursor.next();

    let roleResult = {};
    if (result) {
      // Get the permissions...
      const permissionsCursor = await db.query(aql`FOR doc IN Permissions RETURN doc`);
      const dbPermissions = await permissionsCursor.all();

      roleResult = new RoleResponse(result, dbPermissions);
    }

    return roleResult;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllPermissions = async () => {
  try {
    // Get the permissions...
    const permissionsCursor = await db.query(aql`FOR doc IN Permissions RETURN doc`);
    const dbPermissions = await permissionsCursor.all();

    // Map each user resposne
    for (let i = 0; i < dbPermissions.length; i += 1) {
      dbPermissions[i] = new PermissionResponse(dbPermissions[i]);
    }

    return dbPermissions;
  } catch (err) {
    throw new Error(err);
  }
};

const getPermissionById = async (permissionId) => {
  try {
    const cursor = await db.query(aql`RETURN DOCUMENT("Permissions", ${permissionId.params.permissionId})`);
    const result = await cursor.next();

    let permissionResult = {};
    if (result) {
      permissionResult = new PermissionResponse(result);
    }

    return permissionResult;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  getAllPermissions,
  getPermissionById,
};
