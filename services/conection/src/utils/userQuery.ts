/* eslint-disable no-param-reassign */
import { Op, Sequelize } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';

const AreFriends = (UserId:number, seq:Sequelize) => {
  const friends = `(
    EXISTS(
    SELECT 1 
    FROM "friends" 
    WHERE 
    ("friends"."user_one_id" = "User"."id" AND "friends"."user_two_id" = '${UserId}')
    OR ("friends"."user_two_id" = "User"."id" AND "friends"."user_one_id" = '${UserId}')
    ))`;
  return seq.literal(friends);
};
export const OnlyInterests = (interest:string) =>
  `(
  EXISTS(
    SELECT 1 FROM "interests" AS "i"
    INNER JOIN "user_interests" AS "ui" ON "ui"."interest_id"="i"."id" AND "ui"."user_id"="User"."id"
    WHERE "i"."name"= '${interest}' )
  )`;

export const queryClause = (context:HookContext, where:any) => {
  const { app, params } = context;
  const seq = app.get('sequelizeClient');
  delete where?.profilePrivacy;
  let clause = {
    ...where,
    [Op.and]: [
      {
        [Op.or]: [
          { profilePrivacy: 'public' },
          { id: params?.user?.id },
          {
            [Op.and]: [
              { profilePrivacy: 'friends' },
              AreFriends(params.User.id, seq),
            ],
          },
        ],
      },
    ],
  };
  if (where.friends) {
    delete where.friends;
    clause = {
      ...where,
      [Op.and]: [AreFriends(params.User.id, seq)],
    };
  }
  if (where.interests) {
    const { interests } = where;
    delete where.interests;
    clause[Op.and].push(
      Sequelize.where(Sequelize.literal(OnlyInterests(interests)), true)
    );
  }
  return clause;
};


export default (UserId:number, seq:Sequelize, ex = null) => {


  const isFriend = `(
        EXISTS(
          SELECT 1 FROM "User_friends" WHERE ("User_friends"."UserId" = '${UserId}' AND "User_friends"."friendId" = "User"."id") OR ("User_friends"."UserId" = "User"."id" AND "User_friends"."friendId" = '${UserId}')
        )
  )`;

  const iFollow = `(
        EXISTS(
          SELECT 1 FROM "User_Follower"  WHERE "User_Follower"."UserId" = "User"."id" AND "User_Follower"."FollowerId" = '${UserId}' 
        )
  )`;
  const isAFollower = `(
        EXISTS(
          SELECT 1 FROM "User_Follower" WHERE "User_Follower"."UserId" = '${UserId}' AND "User_Follower"."FollowerId" = "User"."id" 
        )
  )`;
  const hasReceivedFriendRequest = `(
    EXISTS(
    SELECT  1 FROM "User_friends_request" WHERE "User_friends_request"."UserId" ='${UserId}' AND "User_friends_request"."friendsRequestId" =  "User"."id" 
      ))`;

  const hasSentFriendRequest = `(
    EXISTS(
    SELECT  1 FROM "User_friends_request" WHERE ("User_friends_request"."friendsRequestId" = '${UserId}' AND "User_friends_request"."UserId" = "User"."id" )
      ))`;

  const amountOfFriendRequest = `(
    SELECT COUNT(*) FROM "User_friends_request" WHERE "User_friends_request"."UserId" = "User"."id"
  )::int`;

  const exclude = ex || [
    'password',
    'resetAttempts',
    'resetToken',
    'resetTokenExpires',
    'loginAttempts',
    'activationKey',
    'resetPasswordKey',
    'search_vector',
  ];
  return {
    include: [
      // [seq.literal(isFriend), 'isFriend'],
      // [seq.literal(iFollow), 'iFollow'],
      // [seq.literal(isAFollower), 'IsAFollower'],
      // [seq.literal(hasReceivedFriendRequest), 'hasReceivedFriendRequest'],
      // [seq.literal(hasSentFriendRequest), 'hasSentFriendRequest'],
      // [seq.literal(amountOfFriendRequest), 'amountOfFriendRequest'],
    ],
    exclude,
  };
};
