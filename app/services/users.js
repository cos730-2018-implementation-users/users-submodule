/* eslint-disable no-underscore-dangle */
import { Database, aql } from 'arangojs';
import UserResponse from '../mappers/userResponse';
import bcrypt from 'bcryptjs';

require('dotenv').config();

const db = new Database('http://localhost:8529');
db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);

db.useDatabase('Users');

// Retrieve user by id
const getUserById = async (userId) => {
  try {
    const cursor = await db.query(aql`RETURN DOCUMENT("UserDetails", ${userId.params.userid})`);
    const result = await cursor.next();
    return new UserResponse(result);
  } catch (err) {
    throw new Error(err);
  }
};

// Retrieve all users from db
const getAllUsers = async () => {
  try {
    const cursor = await db.query('FOR doc IN UserDetails RETURN doc');
    const result = await cursor.all();

    // Map each user resposne
    for (let i = 0; i < result.length; i += 1) {
      result[i] = new UserResponse(result[i]);
    }

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

// Insert user into db
const createUser = async (user) => {
  try {
    const tempUser = user;

    if (tempUser.password) {
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      tempUser.password = bcrypt.hashSync('secret', salt);
    }

    const cursor = await db.query(aql`INSERT ${tempUser} IN UserDetails RETURN NEW`);
    return new UserResponse(cursor._result[0]);
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
    return new UserResponse(cursor._result[0]);
  } catch (err) {
    throw new Error(err);
  }
};

const patchUser = async (user) => {
  try {
    const cursor = await db.query(aql`UPDATE ${user.params.userid} WITH ${user.request.body} IN UserDetails RETURN NEW`);
    return new UserResponse(cursor._result[0]);
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
