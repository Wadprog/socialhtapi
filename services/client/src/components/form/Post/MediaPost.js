import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import ViewPhoto from "../../../features/album/component/ViewPhoto";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import ResponsivePlayer from "../../common/ResponsivePlayer";

function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), []);

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}

const MediaPost = ({ medias, post }) => {
  const [type, setType] = useState("photo");
  const refPost = useRef(null);
  const navigate = useNavigate();

  const isInViewport = useIsInViewport(refPost);

  const checkType = () => {
    if (
      medias[0]?.original.endsWith(".mp4") ||
      medias[0]?.original.endsWith(".avi") ||
      medias[0]?.original.endsWith(".mov") ||
      medias[0]?.original.endsWith(".wmv") ||
      medias[0]?.original.endsWith(".flv") ||
      medias[0]?.original.endsWith(".f4v") ||
      medias[0]?.original.endsWith(".swf") ||
      medias[0]?.original.endsWith(".mkv") ||
      medias[0]?.original.endsWith(".webm") ||
      medias[0]?.original.endsWith(".html5") ||
      medias[0]?.original.endsWith(".mpeg-2") ||
      medias[0]?.original.endsWith(".avchd") ||
      medias[0]?.original.endsWith(".ogv") ||
      medias[0]?.original.endsWith(".m3u8") ||
      medias[0]?.original.endsWith(".mpd") ||
      medias[0]?.original.endsWith(".m4v")
    ) {
      setType("video");
    }
  };

  function transformImgSingle(url, postNumber) {
    if (!url) return "";
    if (isMobile && postNumber === 1) return url;
    const arrayUrl = url.split("/");

    arrayUrl.splice(6, 0, "q_100");
    if (postNumber === 1) {
      arrayUrl.splice(7, 0, "b_auto:predominant,c_pad,h_1200,w_1400");
    } else {
      arrayUrl.splice(7, 0, "b_auto:predominant,c_pad,h_1200,w_1200");
    }

    return arrayUrl.join("/");
  }
  useEffect(() => {
    checkType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medias]);

  let content;
  let contentVideo;

  if (type === "video") {
    contentVideo = (
      <div className=" rounded-lg bg-cover pt-0 mt-2 flex justify-center items-center w-full">
        <div onClick={() => navigate(`../../post/preview?posts=${post?.id}&type=${type}&from=post`)} className="w-full object-cover">
          <ResponsivePlayer url={medias[0]?.original} autoplay={isInViewport ? true : false} muted={true} volume={1} loop={false} />
        </div>
      </div>
    );
  }

  if (medias?.length === 1) {
    content = (
      <div
        onClick={() => navigate(`../../post/preview?posts=${post?.id}&type=${type}&from=post`)}
        className=" rounded-lg bg-cover pt-0 mt-2 flex justify-center items-center w-full"
      >
        <img
          src={transformImgSingle(medias[0]?.original, 1)}
          alt={"post_image_" + medias[0]?.id}
          className="flex-wrap inline object-cover h-auto max-h-[630px] object-center w-[100%] rounded-xl"
        />
      </div>
    );
  } else if (medias?.length === 2) {
    content = (
      <div className="grid grid-cols-2 gap-2 pt-5">
        {" "}
        {medias?.map((media) => {
          return (
            <>
              <div
                onClick={() => navigate(`../../post/preview?posts=${post?.id}&type=${type}&from=post`)}
                className="flex w-full cursor-pointer "
              >
                <img
                  src={transformImgSingle(media?.original, 2)}
                  alt={"post_image_" + media?.id}
                  className=" flex-wrap inline object-cover h-[100%] w-96 object-top rounded-lg"
                />
              </div>
            </>
          );
        })}
      </div>
    );
  } else if (medias?.length === 3) {
    content = (
      <div className="grid grid-cols-3 rounded pt-5">
        {" "}
        {medias.map((media, idx) => {
          return (
            <>
              {idx === 1 ? (
                <div
                  onClick={() => navigate(`../../post/preview?posts=${post?.id}&type=${type}&from=post`)}
                  className={"w-full col-span-2 p-1 row-span-2"}
                >
                  <img
                    src={transformImgSingle(media?.original, 3)}
                    alt={"post_image_" + media?.id}
                    className={"flex-wrap inline object-cover object-center w-full rounded-lg "}
                  />
                </div>
              ) : (
                <div onClick={() => navigate(`../../post/preview?posts=${post?.id}&type=${type}&from=post`)} className={"w-full p-1"}>
                  <img
                    src={transformImgSingle(media?.original, 3)}
                    alt={"post_image_" + media?.id}
                    className={"flex-wrap inline object-cover object-center w-full rounded-lg "}
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
    );
  } else if (medias?.length === 4) {
    content = (
      <div className="grid grid-rows-2 grid-flow-col gap-2 pt-5">
        {" "}
        {medias?.map((media) => {
          return (
            <>
              <div
                onClick={() => navigate(`../../post/preview?posts=${post?.id}&type=${type}&from=post`)}
                className="flex w-full cursor-pointer"
              >
                <img
                  src={transformImgSingle(media?.original, 4)}
                  alt={"post_image_" + media?.id}
                  className=" flex-wrap inline object-cover object-center w-full rounded-lg"
                />
              </div>
            </>
          );
        })}
      </div>
    );
  } else {
    content = (
      <div className="grid grid-rows-3 grid-flow-col gap-2 pt-5">
        {medias?.map((media) => {
          return (
            <>
              <div className="flex w-full cursor-pointer">
                <ViewPhoto
                  data={post}
                  photo={media}
                  imgComponent={
                    <img
                      src={media?.original}
                      alt={"post_image_" + media?.id}
                      className=" flex-wrap inline object-cover object-center w-full h-48 rounded-lg"
                    />
                  }
                />
              </div>
            </>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div ref={refPost}>{type === "photo" ? content : contentVideo}</div>
    </>
  );
};

MediaPost.propTypes = { medias: PropTypes.array.isRequired, sender: PropTypes.string, post: PropTypes.object };

export default MediaPost;
