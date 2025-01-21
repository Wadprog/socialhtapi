import request from 'supertest'
import { Dialect, Model } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { natsWrapper, Subjects, sequelizeWrapper, UserInterface } from '@webvital/micro-common'
import { StartedPostgreSqlContainer, PostgreSqlContainer } from '@testcontainers/postgresql';
import { addDays } from 'date-fns';

import app from '../../../app'
import { AuthInterface } from '../../../schema/auth.schema';

const natsPublishMock = jest.spyOn(natsWrapper.client, 'publish')


describe(' Auth changePassword Service ', () => {
    const endpoint = '/password_change';
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
        it('The Change Password service is running', async () => {
            const service = app.server.service('password_change');
            expect(service).toBeDefined();
        });

        it('Should throw badRequest if PasswordReset key is not Provided', async () => {
            const user = await testServer
                .post('/users')
                //@ts-ignore
                .send(global.__generateUser__())
                .expect(StatusCodes.CREATED);

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

            const passwordResetKey = Math
                .floor(1000 + Math.random() * 9000)
                .toString()

            await sequelizeWrapper
                .client
                .models
                .Auth
                .create<Model<AuthInterface>>(
                    {
                        userId: user.body.id,
                        passwordResetKey,
                        passwordResetExpires: addDays(new Date(), 1)
                    }
                )

            const usr = await sequelizeWrapper.client.models.User.findByPk<Model<UserInterface>>(user.body.id)

            const oldPassword = usr?.dataValues.password
            await testServer
                .post(endpoint)
                .send({ passwordResetKey, password: 'NewPassword' })
                .expect(StatusCodes.CREATED)

            const usr2 = await sequelizeWrapper.client.models.User.findByPk<Model<UserInterface>>(user.body.id)

            expect(oldPassword).not.toBe(usr2?.dataValues.password)

        })


    })

    describe('Events ', () => {

        it('Should not send notification if password was not updated', async () => {

            const user = await testServer
                .post('/users')
                //@ts-ignore
                .send(global.__generateUser__())
                .expect(StatusCodes.CREATED);

            jest.clearAllMocks()

            await testServer
                .post(endpoint)
                .send({})
                .expect(StatusCodes.BAD_REQUEST)
            expect(natsPublishMock.mock.calls).toHaveLength(0)
        })

        it('Should be succefull but not create a password reset code if the data is incorrect ', async () => {
            const user = await testServer
                .post('/users')
                //@ts-ignore
                .send(global.__generateUser__())
                .expect(StatusCodes.CREATED);

            const passwordResetKey = Math
                .floor(1000 + Math.random() * 9000)
                .toString()

            await sequelizeWrapper
                .client
                .models
                .Auth
                .create<Model<AuthInterface>>(
                    {
                        userId: user.body.id,
                        passwordResetKey,
                        passwordResetExpires: addDays(new Date(), 1)
                    }
                )

            jest.clearAllMocks()
            await testServer
                .post(endpoint)
                .send({ passwordResetKey, password: 'NewPassword' })
                .expect(StatusCodes.CREATED)

            expect(natsPublishMock.mock.calls).toHaveLength(1)
            expect(natsPublishMock.mock.calls[0][0]).toBe(Subjects.PasswordChanged)
        })


    })
});
