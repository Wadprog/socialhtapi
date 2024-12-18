import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import PropTypes from "prop-types";
import { useLinkPreview } from "../../features/external/externalSlice";

const PreviewUrl = ({ url }) => {
  const { data, isError } = useLinkPreview(["preview", "url", url], url !== undefined ? true : false, url);

  return (
    <div className="w-full mt-2">
      {
        isError ? null : data !== undefined && Object.keys(data).length > 0 ? (
          <div className="">
            <a
              href={data?.ogUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="w-full mt-1 h-32 sm:h-40 lg:h-48 bg-placeholder-color"
            >
              <div className="w-full rounded-t-lg">
                <img
                  alt={data?.domain}
                  src={data?.image}
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover border border-gray-200 rounded-t-lg px-[0.5px]"
                />
              </div>
              <div className="w-full p-2 border-b rounded-b-lg border-r border-l border-gray-200 bg-placeholder-color">
                <p className="font-semibold text-sm sm:text-md">{data?.title}</p>
                <p className="text-gray-600 text-sm sm:text-md">
                  <AiOutlineLink className="inline mr-2" size={"20px"} />
                  {data?.domain}
                </p>
              </div>
            </a>
          </div>
        ) : null
        // <a rel="noopener noreferrer" target="_blank" href={url} className="font-bold hover:text-primary">
        //   {url}
        // </a>
      }
    </div>
  );
};

PreviewUrl.propTypes = { url: PropTypes.string.isRequired };

export default PreviewUrl;
