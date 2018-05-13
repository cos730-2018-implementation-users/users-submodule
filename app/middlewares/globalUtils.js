import { Database } from 'arangojs';

const db = new Database({
  // url: 'http://localhost:8529',
  url: 'http://cos.mjshika.xyz/db/users',
});
db.useBasicAuth('root', 'mysecretpassword');

function globalUtils() {
  return async (ctx, next) => {
    ctx.db = db;
    ctx.jwtSecret = 'HelloWorld99';
    await next();
  };
}

module.exports = globalUtils;
