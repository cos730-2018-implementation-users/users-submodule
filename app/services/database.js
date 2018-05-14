import Database from 'arangojs';
// import { generateUsers } from '../data/faker';
require('dotenv').config();

const db = new Database('http://localhost:8529');
// const basePath = 'cos730-users.mjshika.xyz/api/v0.0.1/';
console.log(process.env.ARANGODB_USERNAME);
db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD); // Might need to move this to env variables

// db.createDatabase('Users').then(
//   () => console.log('Database created'),
//   err => console.error('Failed to create database:', err),
// );

db.useDatabase('Users');


const collection = db.collection('UserDetails');

// // Create a user detail table/collection
// collection.create().then(
//   () => console.log('Collection created'),
//   err => console.error('Failed to create collection:', err),
// );
//
//
// // Populate with fake data
// collection.import(generateUsers()).then(
//   result => console.log('Import complete:', result),
//   err => console.error('Import failed:', err),
// );

// db.dropDatabase('Users');

const getAllUsers = async function () {
  try {
    const cursor = await db.query('FOR doc IN UserDetails RETURN doc');
    const result = await cursor.all();
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const createUsers = async function () {
  try {
    const cursor = await db.query('INSERT { name: "John Doe", gender: "m" } INTO UserDetails RETURN NEW');
    return console.log(cursor);
  } catch (err) {
    throw new Error(err);
  }
};

createUsers()
module.exports = { getAllUsers };

