import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import routesPath from "../../routesPath";
// import _ from "lodash";

//RTK query
import { useVerifyEmail } from "../../features/auth/authSlice";

// Core components
import Loader from "../../components/common/Loader";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { VscError } from "react-icons/vsc";

const VerifyEmailScreen = () => {
  const { activationKey } = useParams();

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const verifyEmail = useVerifyEmail(["verify", "email"], undefined, undefined);

  useEffect(() => {
    try {
      verifyEmail.mutateAsync({ action: "verifySignupLong", value: activationKey });
    } catch (e) {
      console.log();
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="">
        {console.log(verifyEmail, verifyEmail?.error?.response)}
        <div className="mt-10 mx-0 md:mx-4">
          {isLoading && <Loader /> ? null : verifyEmail.isSuccess ? (
            <div className="bg-success shadow-3xl rounded-3xl px-2 md:px-4  py-16 justify-center m-auto md:w-2/3 lg:w-2/5">
              <p className="">
                <MdMarkEmailRead size="48" className="m-auto text-green-600" />
              </p>
              <p className="text-green-600 text-center font-semibold mt-4">Your email has been verified succesfully.</p>
            </div>
          ) : verifyEmail?.error ? (
            <div className="bg-info shadow-3xl rounded-3xl px-2 md:px-8 py-16 justify-center m-auto md:w-2/3 lg:w-2/5">
              <p className="">
                <MdInfo size="48" className="m-auto text-blue-600" />
              </p>
              <p className="text-blue-600 text-center font-semibold mt-4">{verifyEmail?.error?.response?.message}</p>
            </div>
          ) : (
            <div className="bg-error shadow-3xl rounded-3xl px-2 md:px-8 py-16 justify-center m-auto md:w-2/3 lg:w-2/5">
              <p className="">
                <VscError size="48" className="m-auto text-white" />
              </p>
              <p className="text-white text-center font-semibold mt-4">Unknow error occurs while verified your email.</p>
            </div>
          )}

          <div className="m-auto text-center mt-16">
            <Link className="text-primary font-bold mt-10 text-center" to={routesPath.NEWSFEED}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailScreen;
