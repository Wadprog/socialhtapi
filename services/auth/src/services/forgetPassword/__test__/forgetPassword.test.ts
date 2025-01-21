import request from 'supertest'
import { Dialect, Model } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { natsWrapper, Subjects, sequelizeWrapper } from '@webvital/micro-common'
import { StartedPostgreSqlContainer, PostgreSqlContainer } from '@testcontainers/postgresql';

import app from '../../../app'
import { AuthInterface } from '../../../schema/auth.schema';

const natsPublishMock = jest.spyOn(natsWrapper.client, 'publish')


describe(' Auth ForgetPassword Service ', () => {
    const endpoint = '/forget_password';
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

    beforeEach(async () => {
        jest.clearAllMocks()
    })

    describe('API', () => {
        it('The Forget Password service is running', async () => {
            const service = app.server.service('forget_password');
            expect(service).toBeDefined();
        });

        it('Should throw badRequest if email is not Provided', async () => {
            await testServer
                .post(endpoint)
                .send({})
                .expect(StatusCodes.BAD_REQUEST)
        })
        it('Should be succefull but not create a password reset code if the data is incorrect ', async () => {
            const user = await testServer
                .post('/users')
                //@ts-ignore
                .send(global.__generateUser__())
                .expect(StatusCodes.CREATED);

            await testServer
                .post(endpoint)
                .send({ email: user.body.email + 'c' })
                .expect(StatusCodes.CREATED)

            const auth = await sequelizeWrapper.client.models.Auth.findOne<Model<AuthInterface>>({ where: { userId: user.body.id } })
            expect(auth).toBeNull()

        })
        it('Should create a new password reset Key', async () => {

            const user = await testServer
                .post('/users')
                //@ts-ignore
                .send(global.__generateUser__())
                .expect(StatusCodes.CREATED);

            await testServer
                .post(endpoint)
                .send({ email: user.body.email })
                .expect(StatusCodes.CREATED)

            const auth = await sequelizeWrapper.client.models.Auth.findOne<Model<AuthInterface>>({ where: { userId: user.body.id } })

            expect(auth).toBeDefined()
            expect(auth?.dataValues.userId).toEqual(user.body.id)
            expect(auth?.dataValues.passwordResetKey).toHaveLength(4)
        })

    })

    describe('Events ', () => {

        it('Should not publish anything if the information were incorrect', async () => {

            const user = await testServer
                .post('/users')
                //@ts-ignore
                .send(global.__generateUser__())
                .expect(StatusCodes.CREATED);
            jest.clearAllMocks()
            await testServer
                .post(endpoint)
                .send({ email: user.body.email + 'c' })
                .expect(StatusCodes.CREATED)

            expect(natsPublishMock.mock.calls).toHaveLength(0)
        })

        it('Should publish reset password event', async () => {

            const user = await testServer
                .post('/users')
                //@ts-ignore
                .send(global.__generateUser__())
                .expect(StatusCodes.CREATED);
            jest.clearAllMocks()
            await testServer
                .post(endpoint)
                .send({ email: user.body.email })
                .expect(StatusCodes.CREATED)

            expect(natsPublishMock.mock.calls[0][0]).toBe(Subjects.PasswordReset)
        })

    })
});
