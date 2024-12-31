/* eslint-disable no-unused-vars */
// import { Op, QueryTypes } from '@sequelize/core';
// import { Params, Id } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
// import { BadRequest } from '@feathersjs/errors';

/** Local dependencies */
import { Application } from '../../declarations';
// import UrlToMedia from '../../utils/UrlToMedia';

// eslint-disable-next-line import/prefer-default-export
export class Friends extends Service {
  app;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  // async find(params: Params) {
  //   const id = params.query.UserId || params.User.id;
  //   const { $limit, $skip } = params.query;
  //   try {
  //     const limit = $limit || this.options.paginate.default;
  //     const skip =
  //       $skip || this.options.paginate.default * (params.query.page - 1) || 0;

  //     const sequelize = this.app.get('sequelizeClient');
  //     const friendList = await sequelize.query(
  //       `SELECT * FROM proc_get_friends(:id,:requester,:limit, :skip)`,
  //       {
  //         type: QueryTypes.SELECT,
  //         replacements: { limit, skip, id, requester: params.User.id },
  //       }
  //     );

  //     const response = Object.assign(
  //       friendList[0],
  //       {},
  //       {
  //         limit,
  //         skip,
  //         data: friendList[0]?.data || [],
  //       }
  //     );

  //     return Promise.resolve(response);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // }

  // async create(data, params) {
  //   const sequelize = this.app.get('sequelizeClient');
  //   const { models } = sequelize;
  //   const approverId = params.User.id;
  //   const { friendId, accept } = data;

  //   try {
  //     const newFriend = await sequelize.query(
  //       'CALL proc_add_friend(:approverId, :friendId, :accept,null,null,null,null,null,null)',
  //       {
  //         replacements: { approverId, friendId, accept },
  //         type: QueryTypes.SELECT,
  //         models: models.User,
  //       }
  //     );
  //     const friend = {
  //       ...newFriend[0],
  //       profilePicture: UrlToMedia(newFriend[0].profilePicture),
  //     };
  //     return Promise.resolve(friend);
  //   } catch (err) {
  //     const error = err.parent;
  //     const msg = error?.detail || error?.message;
  //     throw new BadRequest(msg); // reject with this error .
  //   }
  // }

  // async remove(id: Id, params: Params) {
  //   const userAttributes = ['firstName', 'lastName', 'id', 'profilePicture'];
  //   const { models } = this.app.get('sequelizeClient');

  //   const requesterId = params.User.id;
  //   const { friendId } = params.query;

  //   if (requesterId === friendId)
  //     throw new BadRequest('You are not able remove your own friendship');

  //   const people = await models.User.findAll({
  //     where: { id: { [Op.or]: [requesterId, friendId] } },
  //     attributes: userAttributes,
  //     include: [
  //       {
  //         model: models.User,
  //         as: 'friends',
  //         attributes: userAttributes,
  //       },
  //     ],
  //   });

  //   if (!people)
  //     throw new BadRequest('Your profile or your friend profile was not found');

  //   const requester = people.find(
  //     (person) => person.id.toString() === requesterId.toString()
  //   );
  //   const friend = people.find(
  //     (person) => person.id.toString() === friendId.toString()
  //   );
  //   const check = await Promise.all([
  //     requester.hasFriend(friend),
  //     friend.hasFriend(requester),
  //   ]);

  //   const areFriends = check.some((val) => val === true);

  //   if (!areFriends)
  //     throw new BadRequest(
  //       "You cannot remove as friend you've never been friends"
  //     );
  //   await Promise.all([
  //     friend.removeFriend(requester),
  //     requester.removeFriend(friend),
  //   ]);

  //   const removeFriend = {
  //     id: friend.id,
  //     firstName: friend.firstName,
  //     lastName: friend.lastName,
  //     profilePicture: UrlToMedia(friend.profilePicture),
  //     updatedAt: new Date(),
  //   };

  //   return Promise.resolve(removeFriend);
  // }
}
