import React, { useState, useContext } from "react";
import cryptoRandomString from "crypto-random-string";
import { Link, NavLink } from "react-router-dom";
import routesPath from "../../routesPath";
import PropTypes from "prop-types";
import { Badge, Menu, Button, Tooltip, MenuItem } from "@mui/material";
import logo from "../../assets/images/Asset_2.png";
import { IoIosArrowDown } from "react-icons/io";
// eslint-disable-next-line no-unused-vars
import { BsSearch, BsPower, BsPersonCircle, BsGear } from "react-icons/bs";
import { AiOutlineInbox, AiOutlineClose } from "react-icons/ai";
import { FiActivity } from "react-icons/fi";
import { FaUserAlt, FaBlog, FaUserEdit } from "react-icons/fa";
import { BiUserCircle, BiMessageDetail } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { CgMenuLeft } from "react-icons/cg";
import { MdOutlinePolicy, MdOutlineSettings } from "react-icons/md";
import { BottomMenuContext } from "../../context/BottomMenuContext";
import FriendsPreview from "./Friends/FriendsPreview";
import NotificationPreview from "./Notification/NotificationPreview";
import useAuth from "../../hooks/useAuth";
import { deleteToken } from "../../helpers/index";
import { Search } from "../../components/form/index";

// import client from "../../features/feathers";
const Navbar = ({ user, countMessage }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [search, setSearch] = useState(false);
  const { logout } = useAuth();

  const { toggleSidebar, isSidebarOpen } = useContext(BottomMenuContext);

  const pages = [
    { title: "Activity", icon: <FiActivity size={24} className="mx-auto" />, path: routesPath?.NEWSFEED },
    { title: "People", icon: <BiUserCircle size={24} className="mx-auto" />, path: routesPath?.MEMBERS },
    { title: "Community", icon: <HiUsers size={24} className="mx-auto" />, path: routesPath?.GROUPS },
    { title: "Forum", icon: <BiMessageDetail size={24} className="mx-auto" />, path: routesPath?.FORUMS },
    { title: "Blog", icon: <FaBlog size={24} className="mx-auto" />, path: routesPath?.BLOG },
  ];

  const settings = [
    {
      title: "Profile",
      icon: <BsPersonCircle style={{ paddingRight: "0.5rem" }} size="30px" className="" />,
      path: "../../profile/" + user?.id,
    },
    {
      title: "Edit Profile",
      icon: <FaUserEdit style={{ paddingRight: "0.5rem" }} size="30px" className="" />,
      path: "../../me/profile/edit?tabs=edit&subtabs=general",
    },
    // {
    //   title: "Account Settings",
    //   icon: <BsGear style={{ paddingRight: "0.5rem" }} size="30px" className="" />,
    //   path: "#",
    // },
    {
      title: "Terms & Conditions",
      icon: <MdOutlinePolicy style={{ paddingRight: "0.5rem" }} size="30px" className="" />,
      path: "../../terms-conditions",
    },
    {
      title: "Privacy Policy",
      icon: <MdOutlinePolicy style={{ paddingRight: "0.5rem" }} size="30px" className="" />,
      path: "../../privacy-policy",
    },
    {
      title: "Community Guideline",
      icon: <MdOutlinePolicy style={{ paddingRight: "0.5rem" }} size="30px" className="" />,
      path: "../../community-guidelines",
    },
    {
      title: "Settings",
      icon: <MdOutlineSettings style={{ paddingRight: "0.5rem" }} size="30px" className="" />,
      path: "../../notifications-settings",
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogout() {
    deleteToken("feathers-jwt");
    localStorage.removeItem("lastActiveTime");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePicture");
    logout();
  }

  return (
    <div className="mx-auto w-full sticky top-0 z-40">
      <div className="bg-white basis-full py-1 shadow-md">
        <div className="flex basis-full items-center justify-around md:justify-around lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          {isSidebarOpen ? null : (
            <div className="ml-2 inline md:hidden">
              <button
                onClick={() => {
                  toggleSidebar();
                }}
                className="md:hidden w-[1.9rem] xs:w-[2.7rem] lg:w-[20%] h-[2.9rem] lg:h-14 md:shadow-md focus:outline-none bg-white z-10"
              >
                <CgMenuLeft size={"24px"} className={`${anchorElUser ? "hidden" : ""} mx-auto`} />
              </button>
            </div>
          )}
          <div className="basis-[28%] md:basis-[12%] ml-2 md:pl-6 lg:pl-10 xl:px-6">
            <Link className="" to={routesPath?.NEWSFEED}>
              <div className="text-lg font-bold w-[100px] md:w-[150px] mr-10 py-2 flex">
                {" "}
                <img className="justify-center" src={logo} alt="logo_vwanu" />
              </div>
            </Link>
          </div>
          {search ? (
            <div className="z-50 md:basis-[30%] xl:basis-2/4 flex-none md:block items-center">
              <Search placeholder={`Search people`} setIsSearchOpen={setSearch} />
            </div>
          ) : (
            <div className="md:basis-[30%] xl:basis-2/4 flex-none hidden md:block">
              <div className="hidden xl:flex items-center justify-evenly py-2">
                {pages?.map((page) => (
                  <NavLink
                    to={page?.path}
                    key={cryptoRandomString({ length: 10 })}
                    activeclassname="text-secondary"
                    className="font-semibold text-primary hover:text-secondary active:text-secondary"
                  >
                    {page?.title}
                  </NavLink>
                ))}
              </div>
              <div className="hidden md:flex xl:hidden">
                {pages?.map((page) => (
                  <Tooltip key={cryptoRandomString({ length: 10 })} title={page?.title}>
                    <NavLink
                      to={page?.path}
                      activeclassname="text-secondary"
                      className="mx-auto px-1 flex text-primary hover:text-secondary active:text-secondary"
                    >
                      {page?.icon}
                    </NavLink>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
          <div className="basis-[35%] lg:basis-[30%] flex-none">
            <div className="flex justify-between md:justify-end items-center gap-x-2">
              {search ? (
                <AiOutlineClose onClick={() => setSearch(false)} size="20px" className="text-primary hover:text-secondary" />
              ) : (
                <BsSearch onClick={() => setSearch(true)} size="20px" className="text-primary hover:text-secondary cursor-pointer" />
              )}
              {!search && (
                <>
                  <div className="h-6 bg-black w-[1px]"></div>
                  <Link to={routesPath?.MESSAGE}>
                    <Badge badgeContent={countMessage} color="secondary" className="">
                      <AiOutlineInbox size="24px" className="text-primary hover:text-secondary cursor-pointer" />
                    </Badge>
                  </Link>
                  <div className="">
                    <FriendsPreview />
                  </div>
                  <div className="mr-2">
                    <NotificationPreview />
                  </div>

                  <span className="hidden sm:block">
                    <Tooltip title="Open profile">
                      <Button
                        ariant="text"
                        onClick={handleOpenUserMenu}
                        sx={{ p: 0, fontWeight: "light", paddingLeft: "10px", paddingRight: "10px", borderRadius: "15px" }}
                      >
                        <p className="hidden mr-1 text-[0.90rem] md:hidden xl:inline text-primary hover:text-secondary capitalize font-semibold">
                          {user?.firstName}
                        </p>
                        <span className="hidden md:hidden xl:inline">
                          <IoIosArrowDown size="18px" className="mr-2" />
                        </span>
                        <div className="rounded-[50px] avatar online">
                          <div className="rounded-[12px] w-8 h-8 m-1">
                            {user?.profilePicture?.original ? (
                              <img className="object-cover object-center w-8 h-8" src={user?.profilePicture?.original} alt="profil_image" />
                            ) : (
                              <FaUserAlt size="48" className="" />
                            )}
                          </div>
                        </div>{" "}
                      </Button>
                    </Tooltip>

                    <Menu
                      sx={{ mt: "45px", borderRadius: "15px", width: "100%" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem
                        key={"profile_1"}
                        sx={{ width: "270px", marginLeft: "15px", marginRight: "15px", borderRadius: "15px" }}
                        onClick={handleCloseUserMenu}
                      >
                        <Link to={"../../profile/" + user?.id}>
                          <div
                            className=""
                            style={{
                              display: "flex",
                              alignItems: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                            }}
                          >
                            <p className="w-16">
                              <img
                                style={{ width: "36px", height: "36px", marginRight: "10px" }}
                                className="object-cover object-center m-1 w-10 h-10 mask mask-squircle"
                                src={user?.profilePicture?.original}
                                alt="profil_image"
                              />
                            </p>
                            <p
                              style={{ fontWeight: "400px" }}
                              className="align-middle pl-3 !font-semibold text-primary hover:text-secondary"
                            >
                              {user?.firstName}
                            </p>
                          </div>
                        </Link>
                      </MenuItem>
                      {settings.map((setting) => (
                        <Link key={cryptoRandomString({ length: 10 })} to={setting?.path} className="flex w-full">
                          <MenuItem
                            onClick={handleCloseUserMenu}
                            sx={{ width: "270px", py: 1, marginLeft: "15px", marginRight: "15px", borderRadius: "15px" }}
                          >
                            <span className="py-2">{setting?.icon}</span>

                            {setting.title}
                          </MenuItem>
                        </Link>
                      ))}
                      {!search && (
                        <MenuItem
                          key="logout"
                          sx={{ py: 1, marginLeft: "15px", marginRight: "15px", borderRadius: "15px" }}
                          onClick={handleLogout}
                        >
                          <span className="py-2">
                            <BsPower style={{ paddingRight: "0.5rem" }} size="30px" />
                          </span>
                          Logout
                        </MenuItem>
                      )}
                    </Menu>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = { user: PropTypes.object.isRequired, countMessage: PropTypes.number.isRequired };

export default Navbar;
