import faker from 'faker';
import bcrypt from 'bcryptjs';

faker.locale = 'en';

const numberOfUsers = 5; // Replace with any number >= 1

const generateUsers = () => {
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
      cell: faker.phone.phoneNumber('+27#########'),
      status: 'active',
      deleted: false,

    });
  }

  return users;
};

export default generateUsers;
