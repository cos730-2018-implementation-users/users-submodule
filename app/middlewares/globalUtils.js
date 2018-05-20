import { Database } from 'arangojs';

require('dotenv').config();

const db = new Database(process.env.ARANGODB_HOST);
db.useBasicAuth(process.env.ARANGODB_USERNAME, process.env.ARANDODB_PASSWORD);

function globalUtils() {
  return async (ctx, next) => {
    ctx.db = db;
    ctx.jwtSecret = 'HelloWorld99';
    await next();
  };
}

module.exports = globalUtils;
