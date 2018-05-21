/* eslint-disable no-underscore-dangle */
import { Database, aql } from 'arangojs';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import UserResponse from '../mappers/userResponse';

require('dotenv').config();

const db = new Database({
  // url: process.env.ARANGODB_HOST,
  url: 'http://users-db:8529',
});
// db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);
db.useBasicAuth('root', 'mysecretpassword');

db.useDatabase('Users');

// Retrieve user by id
const getUserById = async (userId) => {
  try {
    const cursor = await db.query(aql`RETURN DOCUMENT("UserDetails", ${userId.params.userid})`);
    const result = await cursor.next();

    let userResult = {};
    if (result) {
      // Get the roles...
      const rolesCursor = await db.query(aql`FOR doc IN Roles RETURN doc`);
      const dbRoles = await rolesCursor.all();

      // Get the permissions...
      const permissionsCursor = await db.query(aql`FOR doc IN Permissions RETURN doc`);
      const dbPermissions = await permissionsCursor.all();

      userResult = await new UserResponse(result, dbRoles, dbPermissions);
    }

    return userResult;
  } catch (err) {
    throw new Error(err);
  }
};

// Retrieve all users from db
const getAllUsers = async () => {
  try {
    const cursor = await db.query('FOR doc IN UserDetails RETURN doc');
    const result = await cursor.all();

    // Get the roles...
    const rolesCursor = await db.query(aql`FOR doc IN Roles RETURN doc`);
    const dbRoles = await rolesCursor.all();

    // Get the permissions...
    const permissionsCursor = await db.query(aql`FOR doc IN Permissions RETURN doc`);
    const dbPermissions = await permissionsCursor.all();

    // Map each user resposne
    for (let i = 0; i < result.length; i += 1) {
      result[i] = new UserResponse(result[i], dbRoles, dbPermissions);
    }

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

// Insert user into db
const createUser = async (user) => {
  try {
    // Ensure email is not duplicate...
    const duplicateEmailCursor = await await db.query(aql`FOR u IN UserDetails FILTER u.email == ${user.email} RETURN u`);
    const duplicateEmailResult = await duplicateEmailCursor.next();

    if (duplicateEmailResult) {
      const errorResponse = {
        code: 422,
        message: 'A user already exists with the specified email.',
        data: {},
      };
      return Promise.reject(errorResponse);
    }

    // Ensure username is not duplicate...
    const duplicateUsernameCursor = await await db.query(aql`FOR u IN UserDetails FILTER u.username == ${user.username} RETURN u`);
    const duplicateUsernameResult = await duplicateUsernameCursor.next();

    if (duplicateUsernameResult) {
      const errorResponse = {
        code: 422,
        message: 'A user already exists with the specified username.',
        data: {},
      };
      return Promise.reject(errorResponse);
    }

    // At this point, everything is okay.
    const tempUser = user;

    if (tempUser.password) {
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      tempUser.password = bcrypt.hashSync('secret', salt);
    }

    // Set the created and updated at times...
    const timeNow = moment().format();
    tempUser.created = timeNow;
    tempUser.updated = timeNow;

    // Set other meta data...
    if (typeof tempUser.deleted === 'undefined') {
      tempUser.deleted = false;
    }

    if (typeof tempUser.status === 'undefined') {
      tempUser.status = 'active';
    }

    tempUser.updatedBy = 'System';

    const cursor = await db.query(aql`INSERT ${tempUser} IN UserDetails RETURN NEW`);

    // Get the roles...
    const rolesCursor = await db.query(aql`FOR doc IN Roles RETURN doc`);
    const dbRoles = await rolesCursor.all();

    // Get the permissions...
    const permissionsCursor = await db.query(aql`FOR doc IN Permissions RETURN doc`);
    const dbPermissions = await permissionsCursor.all();

    return new UserResponse(cursor._result[0], dbRoles, dbPermissions);
  } catch (err) {
    throw new Error(err);
  }
};

// Delete user from DB
const deleteUser = async (userId) => {
  try {
    const cursor = await db.query(aql`UPDATE ${userId.params.userid} WITH { deleted: true } IN UserDetails RETURN NEW`);
    return new UserResponse(cursor._result[0]);
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async (user) => {
  try {
    const cursor = await db.query(aql`REPLACE ${user.params.userid} WITH ${user.request.body} IN UserDetails RETURN NEW`);

    // Get the roles...
    const rolesCursor = await db.query(aql`FOR doc IN Roles RETURN doc`);
    const dbRoles = await rolesCursor.all();

    // Get the permissions...
    const permissionsCursor = await db.query(aql`FOR doc IN Permissions RETURN doc`);
    const dbPermissions = await permissionsCursor.all();

    return new UserResponse(cursor._result[0], dbRoles, dbPermissions);
  } catch (err) {
    throw new Error(err);
  }
};

const patchUser = async (user) => {
  try {
    const cursor = await db.query(aql`UPDATE ${user.params.userid} WITH ${user.request.body} IN UserDetails RETURN NEW`);

    // Get the roles...
    const rolesCursor = await db.query(aql`FOR doc IN Roles RETURN doc`);
    const dbRoles = await rolesCursor.all();

    // Get the permissions...
    const permissionsCursor = await db.query(aql`FOR doc IN Permissions RETURN doc`);
    const dbPermissions = await permissionsCursor.all();

    return new UserResponse(cursor._result[0], dbRoles, dbPermissions);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  patchUser,
  updateUser,
};
