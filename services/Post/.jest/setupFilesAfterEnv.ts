import { jest } from '@jest/globals';
import { Model, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';
import { UserInterface, } from '@webvital/micro-common'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()




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
global.__generateUser__ = async (seq: Sequelize) => {
  const password = faker.internet.password()
  const user =
    await seq.models.User.create<Model<UserInterface>>({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email()
    } as UserInterface)
  // create a jwt key 

  if (!process.env.AUTHENTICATION_SECRET)
    throw new Error('No secret found')
  const accessToken = jwt.sign({ id: user.dataValues.id }, process.env.AUTHENTICATION_SECRET, { expiresIn: '1h' });
  return { ...user, accessToken };


}