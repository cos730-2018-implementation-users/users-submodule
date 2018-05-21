/* eslint-disable no-underscore-dangle */
import { aql } from 'arangojs';
import RoleResponse from '../mappers/roleResponse';
import PermissionResponse from '../mappers/permissionResponse';

const getAllRoles = async (db) => {
  try {
    db.useDatabase('Users');

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

const getRoleById = async (db, roleId) => {
  try {
    db.useDatabase('Users');
    const cursor = await db.query(aql`RETURN DOCUMENT("Roles", ${roleId})`);
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

const getAllPermissions = async (db) => {
  try {
    db.useDatabase('Users');
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

const getPermissionById = async (db, permissionId) => {
  try {
    db.useDatabase('Users');
    const cursor = await db.query(aql`RETURN DOCUMENT("Permissions", ${permissionId})`);
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
