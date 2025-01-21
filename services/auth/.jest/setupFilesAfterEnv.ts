import { jest } from '@jest/globals';
import { Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

// jest.mock("@webvital/micro-common", () => {
//   const originalModule = jest.requireActual("@webvital/micro-common");
//   return {
//     __esModule: true,
//     //@ts-ignore
//     ...originalModule,
//     natsWrapper: {
//       client: {
//         publish: jest.fn()
//       }
//     }

//     // natsWrapper: jest.fn().mockImplementation(() => {
//     //   return {
//     //     client: {
//     //       publish: jest.fn()
//     //     }
//     //   }
//     // })
//   };
// })

//@ts-ignore
global.__migration__ = async (db: Sequelize) => {

  const { Role } = db.models;
  const roles = [
    { name: 'admin', description: 'Admin user', accessLevel: 1 },
    { name: 'user', description: 'Regular user', accessLevel: 3 },
    { name: 'moderator', description: 'Moderator user', accessLevel: 2 },
    { name: 'superadmin', description: 'Super admin user', accessLevel: 0 }
  ];

  for (let role of roles) {
    await Role.create(role)
  }
}

//@ts-ignore
global.__generateUser__ = () => {
  const password = faker.internet.password()
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}