import Database from 'arangojs';
import generateUsers from '../data/faker';
import logger from '../logger';

// Enables env file that stores confidential keys to be loaded into process.env
require('dotenv').config();

const db = new Database(process.env.ARANGODB_HOST);
db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);

db.createDatabase('Users').then(
  () => logger.info({ event: 'execute' }, 'Database create'),
  err => logger.error({ err, event: 'error' }, 'Failed to create database:'),
);

db.useDatabase('Users');

const collection = db.collection('UserDetails');

// Create a user detail table/collection
collection.create().then(
  () => logger.info({ event: 'execute' }, 'Collection created'),
  err => logger.error({ err, event: 'error' }, 'Failed to create collection'),
);

// Populate with fake data
collection.import(generateUsers()).then(
  result => logger.info({ event: 'execute' }, `Import complete: ${result}`),
  err => logger.error({ err, event: 'error' }, 'Import failed'),
);
