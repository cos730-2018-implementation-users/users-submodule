import { Database, aql } from 'arangojs';

require('dotenv').config();

const db = new Database('http://localhost:8529');
db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);

db.useDatabase('Users');

// Retrieve user by id
const getUserById = async (userId) => {
  try {
    const cursor = await db.query(aql`RETURN DOCUMENT("UserDetails", ${userId})`);
    const result = await cursor.next();
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

// Retrieve all users from db
const getAllUsers = async () => {
  try {
    const cursor = await db.query('FOR doc IN UserDetails RETURN doc');
    const result = await cursor.all();
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

// Insert user into db
const createUser = async (user) => {
  try {
    const cursor = await db.query(aql`INSERT ${user} IN UserDetails RETURN NEW`);
    return cursor;
  } catch (err) {
    throw new Error(err);
  }
};

// Delete user from DB
const deleteUser = async (userId) => {
  try {
    const cursor = await db.query(aql`UPDATE ${userId} WITH { deleted: true } IN UserDetails RETURN NEW`);
    return cursor;
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async (userId, userContent) => {
  try {
    const cursor = await db.query(aql`REPLACE ${userId} WITH ${userContent} IN UserDetails RETURN NEW`);
    return cursor;
  } catch (err) {
    throw new Error(err);
  }
};

const patchUser = async (userId, userContent) => {
  try {
    const cursor = await db.query(aql`UPDATE ${userId} WITH ${userContent} IN UserDetails RETURN NEW`);
    return cursor;
  } catch (err) {
    throw new Error(err);
  }
};

// Remove from db for test purposes
const deleteUserObject = async (userId) => {
  try {
    const cursor = await db.query(aql`REMOVE ${userId} IN UserDetail`);
    return cursor;
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
  deleteUserObject,
};

