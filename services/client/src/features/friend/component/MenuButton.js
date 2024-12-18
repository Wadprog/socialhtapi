import React, { useRef, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { VscMegaphone } from "react-icons/vsc";
import { BiBlock } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { RiUserUnfollowLine } from "react-icons/ri";
import Loader from "../../../components/common/Loader";
import { ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import { useSendFollow, useSendUnfollow } from "../../follower/followerSlice";

const MenuButton = ({ otherUser }) => {
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const anchorRef = useRef(null);

  const follow = useSendFollow(["user", "request"]);

  const unfollow = useSendUnfollow(["user", "request"]);

  console.log(otherUser);

  //error dialog
  const FollowRequestError = () =>
    toast.error("Sorry. Error on unfollow this user!", {
      position: "top-center",
    });

  const FollowRequestSuccess = () =>
    toast.success("You follow this user", {
      position: "top-center",
    });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleFollow = async (e, type) => {
    // e.preventDefault();
    setIsLoading(true);
    try {
      if (type === "follow") {
        console.log("ok");
        await follow.mutateAsync({ UserId: otherUser?.id });
      } else {
        console.log("ok");
        await follow.mutateAsync({ UserId: otherUser?.id });
      }
      FollowRequestSuccess();
    } catch (e) {
      console.log(e);
      FollowRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      console.log("ok");
      await unfollow.mutateAsync({ id: otherUser?.id });
      FollowRequestSuccess();
    } catch (e) {
      console.log(e);
      FollowRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="items-center align-middle mr-1 btn btn-sm bg-white border border-gray-300 text-gray-900 rounded-lg mb-2 lg:mb-0 hover:bg-primary hover:text-base-100 hover:border-0 justify-end"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <BsThreeDots size={"18px"} className="mr-1 items-center align-middle" />
          </>
        )}
      </button>
      <Popper
        open={open}
        sx={{ zIndex: "tooltip" }}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className="px-2 rounded-xl"
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  zIndex="tooltip"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={(e) => {
                      if (otherUser?.isFriend) {
                        handleUnfollow();
                      } else {
                        handleFollow(e, "follow");
                      }
                    }}
                    className="text-black rounded-xl hover:text-primary"
                  >
                    {" "}
                    {otherUser?.isFriend ? (
                      <>
                        <VscMegaphone size={"18px"} className="mr-1 items-center align-middle" />
                        {"Unfollow"}
                      </>
                    ) : (
                      <>
                        <RiUserUnfollowLine size={"18px"} className="mr-1 items-center align-middle" />
                        {"Follow"}
                      </>
                    )}
                  </MenuItem>
                  <MenuItem
                    className="text-black  rounded-xl hover:text-primary"
                    onClick={() => {
                      window.location.href = `../../messages?newMessage=true&otherUserId=${otherUser?.id}`;
                      handleClose();
                    }}
                  >
                    {" "}
                    <AiOutlineMail size={"18px"} className="mr-1 items-center align-middle" />
                    Send Message
                  </MenuItem>

                  <MenuItem className="text-black rounded-xl hover:text-primary" onClick={handleClose}>
                    {" "}
                    <BiBlock size={"18px"} className="mr-1 items-center align-middle" />
                    Block
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

MenuButton.propTypes = {
  otherUser: PropTypes.object,
};

export default MenuButton;
