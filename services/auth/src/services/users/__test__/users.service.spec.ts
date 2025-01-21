import request from 'supertest'
import { Dialect } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { natsWrapper, Subjects, sequelizeWrapper } from '@webvital/micro-common'
import { StartedPostgreSqlContainer, PostgreSqlContainer } from '@testcontainers/postgresql';

import app from '../../../app'


const natsPublishMock = jest.spyOn(natsWrapper.client, 'publish')
interface APP {
  server: any
}

describe(' Auth User Service ', () => {
  const endpoint = '/users';
  //@ts-ignore
  let testServer: request.SuperTest;
  let db: StartedPostgreSqlContainer;
  //@ts-ignore

  beforeAll(async () => {

    db = await new PostgreSqlContainer()
      .withExposedPorts(5432)
      .start();

    app.initialize({
      host: db.getHost(),
      dialect: 'postgres' as Dialect,
      database: db.getDatabase(),
      username: db.getUsername(),
      password: db.getPassword(),
      port: db.getPort(),
      logging: false
    })
    await sequelizeWrapper.client.sync({ force: true, logging: false })
    //@ts-ignore
    await global.__migration__(sequelizeWrapper.client)
    testServer = request(app.server)
  }, 20000)

  afterAll(async () => {
    if (db)
      await db.stop()
  })



  describe('API', () => {
    it('The user service is running', async () => {
      const service = app.server.service('users');
      expect(service).toBeDefined();
    });

    it('Should not create user', async () => {
      const responses = await Promise.all(
        [
          { password: 'goodPassword' },
          { email: 'goodPassword' },
          { email: 'notEmail', password: 'goodPassword' },
          { password: 'badPassword', email: 'rt@example.com' },
        ].map(async (requestData) => testServer.post(endpoint).send(requestData))
      );

      responses.forEach((response: request.Response) => {
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.errors).toBeDefined();
      });
    });

    it('Should create and autoLog user', async () => {
      //@ts-ignore
      const user = global.__generateUser__()
      const res = await testServer.post(endpoint).send(user)
      expect(res.body.id).toBeDefined();
      expect(res.statusCode).toBe(201);
      expect(res.body.password).toBeUndefined();
      expect(res.body.accessToken).toBeDefined();


    }, 20000);

    it('should not return users', async () => {
      testServer
        .get(endpoint)
        .expect(StatusCodes.METHOD_NOT_ALLOWED)
    });

    it('should not get a user by id ', async () => {
      //@ts-ignore
      const user = global.__generateUser__()
      //@ts-ignore

      const res: request.Response = await testServer
        .post(endpoint)
        .send(user);

      testServer
        .get(`${endpoint}/${res.body.id}`)
        .expect(StatusCodes.METHOD_NOT_ALLOWED)
    });
  })

  describe('Events ', () => {

    it('Published the user creation', async () => {
      jest.clearAllMocks()
      //@ts-ignore
      const user = global.__generateUser__()
      await testServer.post(endpoint).send(user)
      expect(natsPublishMock.mock.calls).toHaveLength(1)
      expect(natsPublishMock.mock.calls[0][0]).toBe(Subjects.UserRegistered)

    })
    it('Published the user Deletion', async () => {
      jest.clearAllMocks()
      //@ts-ignore
      const user = global.__generateUser__()
      const res = await testServer.post(endpoint).send(user)
      await testServer.delete(`${endpoint}/${res.body.id}`)
        .set('Authorization', res.body.accessToken)

      expect(natsPublishMock.mock.calls).toHaveLength(2)
      expect(natsPublishMock.mock.calls[1][0]).toBe(Subjects.UserDeleted)

    })
  })
});

