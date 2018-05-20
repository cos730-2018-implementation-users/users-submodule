import { Database } from 'arangojs';

require('dotenv').config();

const db = new Database({
  // url: process.env.ARANGODB_HOST,
  url: 'http://users-db:8529',
});
// db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);
db.useBasicAuth('root', 'mysecretpassword');

function globalUtils() {
  return async (ctx, next) => {
    ctx.db = db;
    ctx.jwtSecret = 'HelloWorld99';
    await next();
  };
}

module.exports = globalUtils;
