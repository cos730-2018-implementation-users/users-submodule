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
  username: 'Test234',
  password: '188888',

};

beforeAll(async () => {
  await users.createUser(testUser).then((k) => {
    userId = k._result[0]._key;
  }).catch((err) => {
    throw new Error(err);
  });
});

test('Tests whether object is fully updated', async () => {
  const result = await users.updateUser(userId, update).then(k => k._result[0]);
  expect(result).toBeDefined();
  expect(result.username).toBe(update.username);
  expect(result.firstName).toBe(update.firstName);
  expect(result.lastName).toBe(update.lastName);
  expect(result.email).toBe(update.email);
  expect(result.password).toBe(update.password);
  expect(result.cell).toBe(update.cell);
  expect(result.status).toBe(update.status);
  expect(result.deleted).toBe(update.deleted);
});

afterAll(async () => {
  await users.deleteUserObject(userId).then(k => console.log('User deleted: ', k)).catch((err) => {
    throw new Error(err);
  });
});
