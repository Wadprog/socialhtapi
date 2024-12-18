import { Link, useParams, useOutletContext } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { BsArrowReturnRight } from "react-icons/bs";
import { parseISO, formatRelative } from "date-fns";
import { enUS } from "date-fns/esm/locale";
import { GoPrimitiveDot } from "react-icons/go";

const formatRelativeLocale = {
  lastWeek: "eeee p",
  yesterday: "'Yesterday' p",
  today: "p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const locale = {
  ...enUS,
  formatRelative: (token) => formatRelativeLocale[token],
};

const SelectConversation = ({ setSelectedConversation, setCreateConversationOpened, conversation, conversationId }) => {
  const { id } = useParams();
  const user = useOutletContext();
  const filtered = conversation?.Users?.filter((item) => item?.id !== user?.id);

  return (
    <>
      <div className="w-full border-t border-gray-200">
        {conversation?.Users?.length > 2 ? (
          <Link
            onClick={() => {
              setSelectedConversation(true);
              setCreateConversationOpened(false);
            }}
            to={`../messages/${conversationId}`}
            className={`w-full lg:mx-0 rounded-xl hover:bg-dark-lighten relative flex gap-2 py-2 px-2 lg:px-0 transition duration-300 ${
              conversationId === id ? "bg-placeholder-color" : ""
            }`}
          >
            <div className="w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-start">
                  <div className="mr-2">
                    <img
                      className="mask mask-squircle w-10 h-10"
                      src={filtered[Math.floor(Math.random() * filtered.length)]?.profilePicture}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <p className="font-semibold">
                      {filtered
                        ?.map((item) => item?.firstName)
                        .slice(0, 3)
                        .join(", ")}
                    </p>
                    <div className="flex justify-start pt-1 items-center">
                      {conversation?.Messages[0]?.senderId === user?.id ? (
                        <BsArrowReturnRight className="mr-1" size={"14px"} />
                      ) : (
                        <p className="font-semibold text-xs pr-1">{conversation?.Messages[0]?.sender?.firstName + ":"}</p>
                      )}
                      <p className="text-xs line-clamp-1">{conversation?.Messages[0]?.messageText}</p>
                    </div>
                  </div>
                </div>
                <div className="text-xs flex justify-between">
                  <div className="">{formatRelative(parseISO(conversation?.Messages[0]?.createdAt), new Date(), { locale })}</div>
                  {conversation?.amountOfUnreadMessages > 0 && (
                    <button className="text-primary">
                      <GoPrimitiveDot size={"20px"} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          conversation?.lastMessage &&
          Object.keys(conversation?.lastMessage).length > 0 && (
            <Link
              key={conversationId}
              to={`../messages/${conversationId}`}
              className={`w-full hover:bg-dark-lighten flex items-stretch gap-2 py-2 px-2 lg:px-3 transition duration-300 ${
                conversationId === id || conversation?.amountOfUnreadMessages > 0 ? "bg-placeholder-color" : ""
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-start w-[80%]">
                  <div className="mr-2 w-10 h-10">
                    <img className="mask mask-squircle w-10 h-10" src={filtered[0]?.profilePicture} alt="" />
                  </div>
                  <div className="md:w-[40%] lg:w-[70%]">
                    {filtered?.map((item) => {
                      return (
                        <p
                          key={item?.firstName + "ml-2 align-center text-sm items-center " + item?.lastName}
                          className="font-semibold w-fit line-clamp-1 text-primary hover:text-secondary"
                        >
                          {item?.firstName + " " + item?.lastName}
                        </p>
                      );
                    })}
                    {Object.keys(conversation?.lastMessage).length > 0 && (
                      <div className="flex justify-start pt-0 items-center w-fit max-w-[100%]">
                        {conversation?.lastMessage?.senderId === user?.id ? (
                          <div className="">
                            <BsArrowReturnRight className="mr-1" size={"14px"} />
                          </div>
                        ) : null}
                        <p className="text-sm line-clamp-1 max-w-[100%]">{conversation?.lastMessage?.messageText}</p>
                      </div>
                    )}
                  </div>
                </div>
                {Object.keys(conversation?.lastMessage).length > 0 && (
                  <div className="flex items-center justify-end w-[50%]">
                    <p className="text-xs text-right">
                      {formatRelative(parseISO(conversation?.lastMessage?.createdAt), new Date(), { locale })}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          )
        )}
      </div>
    </>
  );
};

SelectConversation.propTypes = {
  conversation: PropTypes.object,
  conversationId: PropTypes.string,
  setSelectedConversation: PropTypes.func,
  setCreateConversationOpened: PropTypes.func,
};

export default SelectConversation;
