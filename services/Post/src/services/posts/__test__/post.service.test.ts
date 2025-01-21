import request from 'supertest'
import { Dialect } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { natsWrapper, sequelizeWrapper } from '@webvital/micro-common'
import { StartedPostgreSqlContainer, PostgreSqlContainer } from '@testcontainers/postgresql';

import app from '../../../app'

const natsPublishMock = jest.spyOn(natsWrapper.client, 'publish')


describe(' Post Post Service ', () => {
    const endpoint = '/posts';
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


        try { await sequelizeWrapper.client.sync({ force: true, logging: false }) } catch (e) {
            console.log('error happened')
            console.log(e.message)
        }
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
        it('The Post  service is running', async () => {
            const service = app.server.service('posts');
            expect(service).toBeDefined();
        });

        it('Should create a new post under  this user\' name', async () => {
            const user = await global
                .__generateUser__(sequelizeWrapper.client)

            const post = await testServer
                .post(endpoint)
                .send({ postText: 'Hello world' })
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect(StatusCodes.CREATED)
        })
        it('Should get the post back', async () => {
            const user = await global
                .__generateUser__(sequelizeWrapper.client)

            const post = await testServer
                .post(endpoint)
                .send({ postText: 'Hello world' })
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect(StatusCodes.CREATED)

            const retrievedPost: request.Response = await testServer
                .get(`${endpoint}/${post.body.id}`)
                .set('Authorization', `Bearer ${user.accessToken}`)

            expect(retrievedPost.statusCode).toBe(StatusCodes.OK)
            expect(retrievedPost.body.Media).toBeDefined()
            expect(retrievedPost.body.amountOfComments).toBeDefined()
            expect(retrievedPost.body.amountOfComments).toBe(0)
            expect(retrievedPost.body.Media).toHaveLength(0)

        })


    })

    describe('Events ', () => {

        it.todo('Should not publish anything if the information were incorrect')

    })
});
