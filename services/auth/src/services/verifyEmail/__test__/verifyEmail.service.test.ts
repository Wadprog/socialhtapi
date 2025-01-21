import request from 'supertest'
import { Dialect } from 'sequelize';
import { addDays } from "date-fns"
import { StatusCodes } from 'http-status-codes';
import { natsWrapper, Subjects, sequelizeWrapper } from '@webvital/micro-common'
import { StartedPostgreSqlContainer, PostgreSqlContainer } from '@testcontainers/postgresql';

import app from '../../../app'

const natsPublishMock = jest.spyOn(natsWrapper.client, 'publish')


describe(' Auth VerifyEmail Service ', () => {
    const endpoint = '/verify_email';
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
    }, 30000)

    afterAll(async () => {
        if (db)
            await db.stop()
    })

    beforeEach(async () => {
        jest.clearAllMocks()
    })

    describe('API', () => {
        it('The verify eamil service is running', async () => {
            const service = app.server.service('verify_email');
            expect(service).toBeDefined();
        });

        it('Should not verify email when wrong key is provided', async () => {
            //@ts-ignore
            const user = global.__generateUser__()
            const res = await testServer
                .post('/users')
                .send(user)
                .expect(StatusCodes.CREATED)

            testServer
                .post(endpoint)
                .send({ emailVerificationKey: 'Math.random().toString()' })
                .set('Authorization', `Bearer ${res.body.accessToken}`)
                .expect(StatusCodes.BAD_REQUEST)



        })
        it('Should  verify email when the correct key is provided', async () => {
            //@ts-ignore
            const user = global.__generateUser__()
            const res = await testServer
                .post('/users')
                .send(user)
                .expect(StatusCodes.CREATED)

            const fullUser = await sequelizeWrapper.client.models.User.findByPk(res.body.id)
            testServer
                .post(endpoint)
                //@ts-expect-error
                .send({ emailVerificationKey: fullUser!.emailVerificationKey })
                .set('Authorization', `Bearer ${res.body.accessToken}`)
                .then((resp: request.Response) => expect(resp.body.emailVerified).toBeTruthy())

        })
        it('should not verify email if already expired', async () => {

            //@ts-ignore
            const user = global.__generateUser__()
            const res = await testServer
                .post('/users')
                .send(user)
                .expect(StatusCodes.CREATED)

            const fullUser = await sequelizeWrapper.client.models.User.findByPk(res.body.id)
            //@ts-ignore
            fullUser.emailKeyExpires = addDays(fullUser.emailKeyExpires, 1)
            await fullUser?.save()

            testServer
                .post(endpoint)
                //@ts-expect-error
                .send({ emailVerificationKey: fullUser!.emailVerificationKey })
                .set('Authorization', `Bearer ${res.body.accessToken}`)
                .expect(StatusCodes.BAD_REQUEST)


        })

    })

    describe('Events ', () => {
        it('Should not publish if the key was incorrect', async () => {

            const res = await testServer
                .post('/users')
                //@ts-ignore
                .send(global.__generateUser__())
                .expect(StatusCodes.CREATED)

            jest.clearAllMocks()

            const user = await sequelizeWrapper.client.models.User.findByPk(res.body.id)
            const resp = await testServer
                .post(endpoint)
                //@ts-expect-error
                .send({ emailVerificationKey: user!.emailVerificationKey + 'w' })
                .set('Authorization', `Bearer ${res.body.accessToken}`)
                .expect(StatusCodes.BAD_REQUEST)

            expect(resp.body.emailVerified).toBeFalsy()
            expect(natsPublishMock.mock.calls).toHaveLength(0)

        })
        it('Should published  when email is successfully verified', async () => {

            const res = await testServer
                .post('/users')
                //@ts-ignore
                .send(global.__generateUser__())
                .expect(StatusCodes.CREATED)

            jest.clearAllMocks()

            const user = await sequelizeWrapper.client.models.User.findByPk(res.body.id)
            const resp = await testServer
                .post(endpoint)
                //@ts-expect-error
                .send({ emailVerificationKey: user!.emailVerificationKey })
                .set('Authorization', `Bearer ${res.body.accessToken}`)
                .expect(StatusCodes.CREATED)

            expect(resp.body.emailVerified).toBeTruthy()
            expect(natsPublishMock.mock.calls).toHaveLength(1)
            expect(natsPublishMock.mock.calls[0][0]).toBe(Subjects.EmailVerified)

        })
    })
});
