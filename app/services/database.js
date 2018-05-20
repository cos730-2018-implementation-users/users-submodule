import { Database, aql } from 'arangojs';

require('dotenv').config();

const db = new Database('http://localhost:8529');
db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);

db.useDatabase('Users');

// Retrieve user by id
const getUserById = async (userId) => {
  try {
    const cursor = await db.query(aql`RETURN DOCUMENT("UserDetails", ${userId.params.userid})`);
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

// Update a user object - Full or partial update
// FOR u IN users UPDATE u._key WITH { name: CONCAT(u.firstName, " ", u.lastName) } IN users

module.exports = { getAllUsers, createUser, getUserById };

