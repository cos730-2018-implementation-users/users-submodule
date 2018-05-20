import faker from 'faker';
import bcrypt from 'bcryptjs';

faker.locale = 'en';

const numberOfUsers = 5; // Replace with any number >= 1

export default () => {
  const users = [];

  for (let i = 0; i < numberOfUsers; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = `${firstName}_${lastName}`;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync('secret', salt);

    users.push({
      username,
      firstName,
      lastName,
      email: `${username}@gmail.co.za`,
      password,
      cell: faker.phone.phoneNumber('+27121234567'),
      status: 'active',
      deleted: false,
      created: faker.date.past(),
      updated: faker.date.past(),
      updatedBy: 'System',
    });
  }

  return users;
};
