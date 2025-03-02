/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

import { getRandUsers } from '../../utils/generateFakeUser';

const endpoint = '/friends';
const userEndpoint = '/users';
const friendRequestEndpoint = '/friendRequest';
let createdTestUsers = [];
let Friends = [];
let User;
let notFriend;
describe('friend service', () => {
  let testServer;
  beforeAll(async () => {
    await app.get('sequelizeClient').models.User.sync({});
    testServer = request(app);
    // create the users
    createdTestUsers = await Promise.all(
      getRandUsers(5).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );

    // create friend request
    User = createdTestUsers.shift();
    notFriend = createdTestUsers.shift();

    await Promise.all(
      createdTestUsers.map(({ body }) =>
        testServer
          .post(friendRequestEndpoint)
          .send({ UserID: User.body.id })
          .set('authorization', body.accessToken)
      )
    );

    // Accept all friend request
    Friends = await Promise.all(
      createdTestUsers.map(async ({ body }) =>
        testServer
          .post(endpoint)
          .send({ friendId: body.id, accept: true })
          .set('authorization', User.body.accessToken)
      )
    );
  }, 30000);

  afterAll(async () => {
    const sequelize = app.get('sequelizeClient');
    await sequelize.models.User.sync({ force: true });
  });

  it('should see all his friends', async () => {
    const myFriendsR = await testServer
      .get(endpoint)
      .set('authorization', User.body.accessToken);

    expect(myFriendsR.status).toEqual(StatusCodes.OK);
    expect(Array.isArray(myFriendsR.body.data)).toBe(true);
    expect(myFriendsR.body.data).toHaveLength(Friends.length);

    expect(
      myFriendsR.body.data.every((user) => user.id === notFriend.body.id)
    ).toBe(false);
  });

  it('User should Remove someone as friend', async () => {
    const toUnfriend = Friends[0].body;

    const res = await testServer
      .delete(`${endpoint}/?friendId=${toUnfriend.id}`)
      .set('authorization', User.body.accessToken);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: toUnfriend.id,
        lastName: toUnfriend.lastName,
        firstName: toUnfriend.firstName,
        updatedAt: expect.any(String),
        profilePicture: toUnfriend.profilePicture,
      })
    );

    const myFriendsR = await testServer
      .get(endpoint)
      .set('authorization', User.body.accessToken);

    myFriendsR.body.data.forEach((friend) => {
      expect(Friends.some((user) => user.body.id === friend.id)).toBe(true);
    });

    expect(
      myFriendsR.body.data.every((user) => user.id === toUnfriend.id)
    ).toBe(false);
  });
  it('Requester should remove someone as friend', async () => {
    const toUnfriend = User.body;
    const requester = createdTestUsers[2].body;

    const res = await testServer
      .delete(`${endpoint}/?friendId=${toUnfriend.id}`)
      .set('authorization', requester.accessToken);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: toUnfriend.id,
        lastName: toUnfriend.lastName,
        firstName: toUnfriend.firstName,
        updatedAt: expect.any(String),
        profilePicture: toUnfriend.profilePicture,
      })
    );

    const deleteUser = res.body;
    delete deleteUser.updatedAt;
    expect(toUnfriend).toMatchObject(deleteUser);

    const myFriendsR = await testServer
      .get(endpoint)
      .set('authorization', requester.accessToken);

    myFriendsR.body.data.forEach((friend) => {
      if (friend.id !== requester.id)
        expect(Friends.some((user) => user.body.id === friend.id)).toBe(true);
    });
  });
});
