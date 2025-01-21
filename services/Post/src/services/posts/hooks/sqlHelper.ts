import { Id } from '@feathersjs/feathers';

export const amountOfComments = `(
      SELECT 
      COUNT(*) 
      FROM "posts" AS "Pt"
      WHERE "Pt"."post_id" = "Post"."id"
    )::int`;
export const amountOfKorems = `(
      SELECT
      COUNT(k.post_id)
      FROM korems AS k
      WHERE k.post_id = "Post".id 
    )::int`;

export const reactors = `(
SELECT 
   json_agg(
    json_build_object(
      'createdAt', k.created_at,
      'firstName', u.first_name,
      'lastName',  u.last_name,
      'profilePicture', u.profile_picture
    )
  )
    FROM korems k
    JOIN users  u ON u.id = k.user_id
    WHERE k.post_id="Post".id 
    LIMIT 3
  )`;
export const isReactor = (userId: Id) => `(
SELECT 
  json_agg(
    json_build_object(
     'createdAt',korems.created_at
    ) 
    ) 
    FROM korems
    WHERE korems.post_id="Post".id 
    AND  korems.user_id='${userId}'
  )`;
export const CanDelete = (userId: Id) => `(
  CASE
  WHEN "Post".user_id = '${userId}' THEN true
  WHEN "Post".post_id IS NOT NULL
  AND  EXISTS(
   Select 1
   FROM posts 
   WHERE posts."id" = "Post".post_id AND posts.user_id = '${userId}')
  THEN true
  ELSE false
  END)`;