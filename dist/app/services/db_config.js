'use strict';

var _arangojs = require('arangojs');

var _arangojs2 = _interopRequireDefault(_arangojs);

var _faker = require('../data/faker');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Enables env file that stores confidential keys to be loaded into process.env
require('dotenv').config();

var basePath = 'cos730-users.mjshika.xyz/api/v0.0.1/';
var db = new _arangojs2.default('http://' + basePath + ':8529');

db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);

db.createDatabase('Users').then(function () {
  return console.log('Database created');
}, function (err) {
  return console.error('Failed to create database:', err);
});

db.useDatabase('Users');

var collection = db.collection('UserDetails');

// Create a user detail table/collection
collection.create().then(function () {
  return console.log('Collection created');
}, function (err) {
  return console.error('Failed to create collection:', err);
});

// Populate with fake data
collection.import((0, _faker.generateUsers)()).then(function (result) {
  return console.log('Import complete:', result);
}, function (err) {
  return console.error('Import failed:', err);
});
//# sourceMappingURL=db_config.js.map