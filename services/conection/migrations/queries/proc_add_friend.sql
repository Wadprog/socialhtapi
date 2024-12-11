CREATE OR REPLACE PROCEDURE public.proc_add_friend(p_aprover_id uuid, p_requester_id uuid, p_accept boolean, INOUT id uuid, INOUT "firstName" text, INOUT "lastName" text, INOUT "profilePicture" text, INOUT "createdAt" text, INOUT "updatedAt" text)
 LANGUAGE plpgsql
AS $$
BEGIN

-- Check if theire have been a friend request from the requester. 
IF NOT EXISTS (
SELECT 1 FROM "User_friends_request" 
WHERE "UserId"= p_aprover_id
AND "friendsRequestId"= p_requester_id
)
THEN
 RAISE EXCEPTION 'There is no previous connection request made';
ELSE 
 -- Check if they are already friends. 
 IF EXISTS
 ( 
  SELECT 1 
  FROM "User_friends"
  WHERE 
   ("UserId"= p_aprover_id AND "friendId"= p_requester_id) OR 
   ("UserId"= p_requester_id AND "friendId"= p_aprover_id)
  )
 THEN
  RAISE EXCEPTION 'You are already friends';
 ELSE 
  -- CHECK WHETHER WE SHOULD CREATE FRIENDS OR REJECT FRIENDS 
  IF(p_accept = TRUE)
  THEN 
  -- Add them as friend
    INSERT INTO "User_friends" 
    ("UserId", "friendId", "createdAt", "updatedAt")
    VALUES (p_aprover_id, p_requester_id, current_timestamp, current_timestamp);

-- Make them follow each other 
BEGIN 
    INSERT INTO "User_Follower" 
    ("UserId", "FollowerId", "createdAt", "updatedAt")
    VALUES (p_aprover_id, p_requester_id, current_timestamp, current_timestamp), 
           (p_requester_id, p_aprover_id, current_timestamp, current_timestamp);
EXCEPTION WHEN OTHERS THEN COMMIT;

END;
   ELSE 
    INSERT INTO "User_friends_undesired" 
    ("UserId", "undesiredFriendId", "createdAt", "updatedAt")
    VALUES (p_aprover_id, p_requester_id, current_timestamp, current_timestamp);
 
  END IF;  
   SELECT "U"."id", "U"."firstName", "U"."lastName", "U"."profilePicture", "U"."createdAt", "U"."updatedAt"
    INTO "id", "firstName", "lastName", "profilePicture", "createdAt", "updatedAt"
    FROM "Users" AS "U"
    WHERE "U"."id" = p_requester_id;

    DELETE FROM "User_friends_request" AS "ufr"
    WHERE "ufr"."UserId"= p_aprover_id AND "ufr"."friendsRequestId" =p_requester_id;


 END IF;
END IF;
END;
$$