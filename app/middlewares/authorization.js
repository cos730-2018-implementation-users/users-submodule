import { Database } from 'arangojs';

const db = new Database({
  url: 'http://localhost:8529',
});
db.useBasicAuth('root', 'mysecretpassword');

function globalUtils() {
  return async (ctx, next) => {
    ctx.db = db;
    await next();
  };
}

module.exports = globalUtils;
