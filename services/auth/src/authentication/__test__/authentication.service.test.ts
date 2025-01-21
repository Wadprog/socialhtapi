import request from 'supertest'
import { Dialect, Model } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { natsWrapper, Subjects, sequelizeWrapper } from '@webvital/micro-common'
import { StartedPostgreSqlContainer, PostgreSqlContainer } from '@testcontainers/postgresql';

import app from '../../app'
import { AuthInterface } from '../../schema/auth.schema';

const natsPublishMock = jest.spyOn(natsWrapper.client, 'publish')


describe('Authentication Service ', () => {
    const endpoint = '/authentication';
    //@ts-ignore
    let testServer: request.SuperTest;
    let db: StartedPostgreSqlContainer;
    //@ts-ignore

    beforeAll(async () => {

        db = await new PostgreSqlContainer()
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

    beforeEach(async () => {
        jest.clearAllMocks()
    })

    describe('API', () => {
        it('The Authentication service is running', async () => {
            const service = app.server.service('authentication');
            expect(service).toBeDefined();
        });


        it('Should be abler to login ', async () => {
            //@ts-ignore
            const usr = global.__generateUser__()

            await testServer
                .post('/users')
                .send(usr)
                .expect(StatusCodes.CREATED);

            const res: request.Response = await testServer
                .post(endpoint)
                .send({
                    email: usr.email,
                    password: usr.password,
                    strategy: 'local'
                })

            expect(res.statusCode).toBe(StatusCodes.CREATED)

            expect(res.body.accessToken).toBeDefined()





        })


    })

    describe('Events ', () => {

        it.todo('Should not publish anything if the information were incorrect')

        it.todo('Should publish reset password event')

    })
});
