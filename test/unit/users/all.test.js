const users = require('../../../app/services/database');

test('Returns all users from the db', async () => {
  expect(await users.getAllUsers().then(k => k.length)).toBeGreaterThanOrEqual(1);
});
