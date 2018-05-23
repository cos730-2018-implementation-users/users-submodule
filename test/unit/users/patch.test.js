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

const update = {
  username: 'Tes2t',
  password: '12345690',
};

beforeAll(async () => {
  await users.createUser(testUser).then((k) => {
    userId = k._result[0]._key;
  }).catch((err) => {
    throw new Error(err);
  });
});

test('Tests whether object is partially updated', async () => {
  const result = await users.patchUser(userId, update).then(k => k._result[0]);
  expect(result).toBeDefined();
  expect(result.username).toBe(update.username);
  expect(result.password).toBe(update.password);
});

afterAll(async () => {
  await users.deleteUserObject(userId).then(k => console.log('User deleted: ', k)).catch((err) => {
    throw new Error(err);
  });
});


