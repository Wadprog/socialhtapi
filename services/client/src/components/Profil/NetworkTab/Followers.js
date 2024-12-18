import React from "react";
import PropTypes from "prop-types";
import ViewFriend from "../ViewFriend";
import { useGetListFollowers } from "../../../features/follower/followerSlice";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../common/EmptyComponent";

const Followers = ({ user, isNetwork }) => {
  const {
    data: listFollowers,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetListFollowers(["user", "followers", user?.id], true, user?.id);

  return (
    <>
      <ViewFriend
        data={listFollowers}
        isError={isError}
        isNetwork={isNetwork}
        isLoading={isLoading}
        arrayQuery={["user", "followers"]}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        noDataLabel={
          <div className="flex justify-center w-full">
            <EmptyComponent
              border={false}
              icon={<ImSad size={"32px"} className="" />}
              placeholder={"Sorry, There's no Friend in Vwanu."}
              tips={""}
            />
          </div>
        }
      />
    </>
  );
};

Followers.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
  isNetwork: PropTypes.bool,
};

export default Followers;
