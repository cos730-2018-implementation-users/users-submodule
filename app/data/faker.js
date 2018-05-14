import faker from 'faker';

faker.locale = 'en';

const numberOfUsers = 1000; // Replace with any number >= 1

export const generateUsers = () => {

  const users = [];

  for (let i = 0; i < numberOfUsers; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let username = `${firstName}_${lastName}`;

    users.push({
      username,
      firstName,
      lastName,
      email: `${username}@gmail.co.za`,
      password: faker.internet.password(),
      cell: faker.phone.phoneNumber('+27#########'),
      status: 'active',
      deleted: false,

    });
  }

  return users;
};

