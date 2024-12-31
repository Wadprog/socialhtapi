CREATE OR REPLACE PROCEDURE proc_remove_follower(userId integer, followerId integer)
LANGUAGE 'plpgsql'
AS $$
BEGIN
    -- Remove the follower from the followers table
    DELETE FROM "public".followers
    WHERE user_id = userId AND follower_id = followerId;
COMMIT;
END;
$$;