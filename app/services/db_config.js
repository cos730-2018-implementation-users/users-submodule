import Database from 'arangojs';
import { generateUsers } from '../data/faker';

// Enables env file that stores confidential keys to be loaded into process.env
require('dotenv').config();

const basePath = 'cos730-users.mjshika.xyz/api/v0.0.1/';
const db = new Database(`http://${basePath}:8529`);

db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);

db.createDatabase('Users').then(
  () => console.log('Database created'),
  err => console.error('Failed to create database:', err),
);

db.useDatabase('Users');

const collection = db.collection('UserDetails');

// Create a user detail table/collection
collection.create().then(
  () => console.log('Collection created'),
  err => console.error('Failed to create collection:', err),
);

// Populate with fake data
collection.import(generateUsers()).then(
  result => console.log('Import complete:', result),
  err => console.error('Import failed:', err),
);
