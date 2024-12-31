// import isEmpty from 'lodash/isEmpty';
import { Op } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';

const UserAttributes = [
  'firstName',
  'lastName',
  'id',
  'profilePicture',
];


const amountOfComments = `(
      SELECT 
      COUNT(*) 
      FROM "posts" AS "Pt"
      WHERE "Pt"."post_id" = "Post"."id"
    )::int`;
const amountOfReactions = `(
      SELECT
      COUNT(k.post_id)
      FROM korems AS k
      WHERE k.post_id = "Post".id 
    )::int`;
//   const isReactor = `(
// SELECT 
//   json_agg(
//     json_build_object(
//      'createdAt',"R"."createdAt",
//     ) 
//     ) 
//     FROM "Reactions" AS "R"
//     WHERE "R"."entityId"="Post"."id" AND  "R"."entityType"='Post' AND "R"."UserId"='${context.params.User.id}'
//   )`;
// const friends = `(
//    EXISTS(
//     SELECT 1 FROM "User_friends" WHERE "User_friends"."UserId" = "Post"."UserId" AND "User_friends"."friendId" = '${params.User.id}'
//    )
//   )`;


//   const Original = `(
//   SELECT
//   CASE 
//   WHEN "Post"."originalId" IS NULL THEN NULL
//   WHEN "Post"."originalType" = 'Post' THEN
//   (
//   SELECT 
//   json_build_object(
//     'id', "P"."id",
//     'content', "P"."postText",
//     'createdAt', "P"."createdAt",
//     'updatedAt', "P"."updatedAt",
//     'firstName', "U"."firstName",
//     'lastName', "U"."lastName",
//     'UserId', "U"."id",
//     'profilePicture', "U"."profilePicture"
//   )
//     FROM "Posts" AS "P" 
//     INNER JOIN "Users" AS "U" ON "U"."id" = "P"."UserId"
//     WHERE "P"."id" = "Post"."originalId"
//     LIMIT 1
//     )
//   WHEN "Post"."originalType" = 'Blogs' THEN
//   (
//   SELECT 
//   json_build_object(
//     'id', "B"."id",
//     'content', "B"."blogText",
//     'createdAt', "B"."createdAt",
//     'updatedAt', "B"."updatedAt",
//     'coverPicture', "B"."coverPicture",
//     'firstName', "U"."firstName",
//     'lastName', "U"."lastName",
//     'UserId', "U"."id",
//     'profilePicture', "U"."profilePicture",
//     'title', "B"."blogTitle"
//   )
//     FROM "Blogs" AS "B"
//     INNER JOIN "Users" AS "U" ON "U"."id" = "B"."UserId"
//     WHERE "B"."id" = "Post"."originalId"
//     LIMIT 1
//   )
//   WHEN "Post"."originalType" = 'Discussion' THEN
//   (
//   SELECT
//   json_build_object(
//     'id', "D"."id",
//     'content', "D"."body",
//     'createdAt', "D"."createdAt",
//     'updatedAt', "D"."updatedAt",
//     'firstName', "U"."firstName",
//     'lastName', "U"."lastName",
//     'UserId', "U"."id",
//     'profilePicture', "U"."profilePicture"
//   )
//     FROM "Discussions" AS "D"
//     INNER JOIN "Users" AS "U" ON "U"."id" = "D"."UserId"
//     WHERE "D"."id" = "Post"."originalId"
//     LIMIT 1
//   )
//   END
// )`;

// const CanDelete = `(
//   CASE
//   WHEN "Post"."UserId" = '${params.User.id}' THEN true
//   WHEN "Post"."wallId" = '${params.User.id}' THEN true
//   WHEN "Post"."PostId" IS NOT NULL
//   AND  EXISTS(
//    Select 1
//    FROM "Posts" as "P"
//    WHERE "P"."id" = "Post"."PostId" AND "P"."UserId" = '${params.User.id}')
//   THEN true
//   ELSE false
//   END)`;


export default (context: HookContext): HookContext => {
  const { app, params } = context;
  const Sequelize = app.get('sequelizeClient');
  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  const single = context.method === 'get';
  const queryString = {
    PostId: null,
    ...where,
    [Op.and]: {
      [Op.or]: [
        { privacyType: 'public' },
        { user_id: params.user.id },
      ],
    },
  };


  const clause = single ? { id: context.id } : queryString;

  params.sequelize = {
    // logging: console.log,
    where: clause,
    attributes: {
      include: [
        [Sequelize.literal(amountOfComments), 'amountOfComments'],
        [Sequelize.literal(amountOfReactions), 'amountOfReactions'],
        // [Sequelize.literal(isReactor), 'isReactor'],
        // [Sequelize.literal(Original), 'Original'],
        // [Sequelize.literal(CanDelete), 'canDelete'],
      ],
      exclude: ['UserId'],
    },

    include: [
      {
        model: Sequelize.models.User,
        attributes: UserAttributes,
        required: true,
      },
      {
        model: Sequelize.models.Community,
      },
      {
        model: Sequelize.models.Media,
        as: 'media',
        //   include: {
        //     model: Sequelize.models.User,
        //     attributes: UserAttributes,
        //   },
      },
    ],
    raw: false,
  };

  return context;
};
