/* eslint-disable no-unused-vars */
import { Op } from '@sequelize/core';
import { Params, Id } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { BadRequest, NotFound } from '@feathersjs/errors';
/** Local dependencies */
import { Application } from '../../declarations';
// import UrlToMedia from '../../utils/UrlToMedia';

const UrlToMedia = (url: string) => url;
type Data = any;
const userAttributes = ['firstName', 'lastName', 'id', 'profilePicture'];
// eslint-disable-next-line import/prefer-default-export
export class FriendRequest extends Service {
  app;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data:Data, params:Params) {
    const requesterId = params.User.id;
    const friendId = data.UserID;

    if (requesterId.toString() === friendId.toString())
      throw new BadRequest('It is not permitted to be your own friend');
    const { models } = this.app.get('sequelizeClient');

    const people = await models.User.findAll({
      where: { id: { [Op.or]: [requesterId, friendId] } },
      attributes: ['id'],
      include: [
        {
          model: models.User,
          as: 'friendsRequest',
          attributes: userAttributes,
        },
      ],
    });

    const requester = people.find(
      (person:any) => person.id.toString() === requesterId.toString()
    );

    const friend = people.find(
      (person:any) => person.id.toString() === friendId.toString()
    );

    if (!requester || !friend)
      throw new NotFound(
        'Your profile or the person you want to be friend with was not found'
      );

    const previouslyDeniedFriendRequest = await requester.hasUndesiredFriends(
      friend
    );

    if (previouslyDeniedFriendRequest)
      await requester.removeUndesiredFriends(friend);

    const isUndesiredFriend = await friend.hasUndesiredFriends(requester);
    if (isUndesiredFriend)
      throw new BadRequest('Your previous friend request was denied');

    let alreadyFiends = await Promise.all([
      friend.hasFriend(requester),
      requester.hasFriend(friend),
    ]);

    alreadyFiends = alreadyFiends[0] || alreadyFiends[1];
    if (alreadyFiends) throw new BadRequest('You are already friends');
    const requestedFriendship = await friend.hasFriendsRequest(requester);

    if (requestedFriendship)
      throw new BadRequest('You already requested to be friends');
    await Promise.all([
      friend.addFriendsRequest(requester),
      // requester.addFriendshipRequested(friend),
    ]);

    const user2 = await requester.reload();

    await friend.reload();

    const friendRequest = {
      id: friend.id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      profilePicture: UrlToMedia(friend.profilePicture),
      createdAt: friend.createdAt,
      updatedAt: friend.updatedAt,
    };

    return Promise.resolve([friendRequest]);
  }

  async patch(id: Id, data:Data, params: Params) {
    return this.app.service('friends').create(data, params);
  }

  async remove(id:Id, params:Params) {
    const requesterId = params.User.id;
    // @ts-ignore
    const { friendId } = params.query;
    const { models } = this.app.get('sequelizeClient');

    if (requesterId.toString() === friendId.toString())
      throw new BadRequest(
        'You are not able to delete a friend request to yourself'
      );

    const people = await models.User.findAll({
      where: { id: { [Op.or]: [requesterId, friendId] } },
      attributes: userAttributes,
      include: [
        {
          model: models.User,
          as: 'friendsRequest',
          attributes: userAttributes,
        },
        {
          model: models.User,
          as: 'FriendshipRequested',
          attributes: userAttributes,
        },
      ],
    });

    const requester = people.find(
      (person:any) => person.id.toString() === requesterId.toString()
    );
    const friend = people.find(
      (person:any) => person.id.toString() === friendId.toString()
    );

    if (!friend || !requester)
      throw new BadRequest('This person was not found');
    const hasRequestedFriendship = await requester.hasFriendshipRequested(
      friend
    );

    if (!hasRequestedFriendship)
      throw new NotFound('No friendship records found');

    await Promise.all([
      friend.removeFriendsRequest(requester),
      requester.removeFriendshipRequested(friend),
    ]);

    const user = {
      id: friend.id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      updatedAt: new Date(),
      profilePicture: UrlToMedia(friend.profilePicture),
      createdAt: friend.createdAt,
    };

    return Promise.resolve(user);
  }

}
