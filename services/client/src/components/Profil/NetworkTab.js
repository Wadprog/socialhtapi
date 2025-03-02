import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams, useOutletContext } from "react-router-dom";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Friends from "./NetworkTab/Friends";
import Request from "./NetworkTab/Request";
import Followers from "./NetworkTab/Followers";
import Following from "./NetworkTab/Following";

const NetworkTab = ({ user }) => {
  const me = useOutletContext();
  const { id } = useParams();
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl">
        <h4 className="md:text-left text-center mb-8 text-lg font-semibold text-primary">{`My Network`}</h4>
        <TabContext value={value}>
          <div>
            <TabList
              sx={{ marginBottom: "-2rem", borderBottom: "1px #eff3ff solid" }}
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary TabList  example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                sx={{ textTransform: "capitalize", fontSize: "1rem", color: "#ff4200" }}
                value="one"
                label={`Connections (${user?.amountOfFriend})`}
              />
              <Tab
                sx={{ textTransform: "capitalize", fontSize: "1rem", color: "#ff4200" }}
                value="two"
                label={`Followers (${user?.amountOfFollower})`}
              />
              <Tab
                sx={{ textTransform: "capitalize", fontSize: "1rem", color: "#ff4200" }}
                value="three"
                label={`Following (${user?.amountOfFollowing})`}
              />
              {id?.toString() === me?.id?.toString() && (
                <Tab
                  sx={{ textTransform: "capitalize", fontSize: "1rem", color: "#ff4200" }}
                  value="four"
                  label={`Request (${user?.amountOfFriendRequest})`}
                />
              )}
            </TabList>
          </div>
          <TabPanel value="one">
            <Friends isNetwork={true} user={user} />
          </TabPanel>
          <TabPanel value="two">
            <Followers isNetwork={true} user={user} />
          </TabPanel>
          <TabPanel value="three">
            <Following isNetwork={true} user={user} />
          </TabPanel>
          {id?.toString() === user?.id?.toString() && (
            <TabPanel value="four">
              <Request isNetwork={true} user={user} />
            </TabPanel>
          )}
        </TabContext>
      </div>
    </>
  );
};

NetworkTab.propTypes = {
  user: PropTypes.object,
};

export default NetworkTab;
