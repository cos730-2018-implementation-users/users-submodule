const users = require('../../../app/services/database');

let userId = '';

const testUser = {
  username: 'Test',
  firstName: 'Test 1',
  lastName: 'Test 2',
  email: 'test@test.com',
  password: '123456',
  cell: '0123456789',
  status: 'active',
  deleted: false,
};

test('Tests whether object is created', async () => {
  const result = await users.createUser(testUser).then((k) => {
    userId = k._result[0]._key;
    return k._result[0];
  });
  expect(result).toBeDefined();
  expect(result._key).toBe(userId);
});

afterAll(async () => {
  await users.deleteUserObject(userId).then(k => console.log('User deleted: ', k)).catch((err) => {
    throw new Error(err);
  });
});
