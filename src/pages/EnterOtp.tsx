import React, { useState } from "react";
import OnBoardingTemplate from "../components/OnBoardingTemplate";
import GradientButton from "../components/GradientButton";
import { useLocation, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../lib/util";
import axiosInstance from "../lib/client";
import { setAccessToken, setRefreshToken } from "../lib/tokenStorage";
import { useStore } from "../store/store";

const EnterOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setLogin = useStore((state) => state.setIsUserLoggedIn);

  const { state } = location;
  const { email, password, name } = state;

  const [otp, setOtp] = useState<any>();
  const [isCalledSignup, setIsCalledSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitFunction = async (e) => {
    e.preventDefault();
    if (isCalledSignup) return;

    if (otp.length == 4) {
      const verifyOtp = await axiosInstance.post("/signUp", {
        email,
        password,
        name,
        otp,
      });
      setIsCalledSignup(false);
      console.log(verifyOtp);

      if (verifyOtp.data.isOtpVerified) {
        setAccessToken(verifyOtp.data.accessToken);
        setRefreshToken(verifyOtp.data.refreshToken);
        navigate('/')
        setLogin(true);
      } else {
        setErrorMessage("Some Error Happened");
      }
      setIsCalledSignup(true);
    } else {
      setIsCalledSignup(false);

      setErrorMessage(
        "The input values must be in Proper form. And make sure everything filled without any additional space"
      );
    }
  };

  return (
    <OnBoardingTemplate
      mainTitle="Check The Mail.!"
      firstRoundGradientStyle="absolute md:top-[10%] top-[15%]   left-[10%] md:left-0  rotate-90  bg-gradient-to-r from-[#190061] to-[#0A1B30]"
      secondRoundGradientStyle="absolute bottom-[10%]  right-[10%]  rotate-[40deg]  bg-gradient-to-r from-[#000F61] to-[#0A1730]"
    >
      <div className="w-full h-full  relative ">
        <div className="w-full md:p-10 p-4  pt-10">
          <h3 className="text-white font-extrabold tracking-wide  md:text-3xl text-xl">
            OTP
          </h3>
          <p className="text-white ">Just some details to get you in.!</p>
          {errorMessage.length != 0 && (
            <p className="text-red-600 text-sm md:text-lg ">{errorMessage}</p>
          )}
          <form>
            <input
              type="text"
              className="w-full mt-6 bg-inherit border-[0.5px] rounded-[10px] py-2 px-4 text-white"
              placeholder="OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />

            <GradientButton
              title="Signup"
              onClick={submitFunction}
              additionalStyles="w-full bg-gradient-to-r from-[#2E4CEE] via-[#221EBF] to-[#040F75] p-2 text-white font-bold  rounded-[10px] my-6"
            />
          </form>
        </div>
        <div className="absolute bottom-0 w-full md:p-10 p-4  ">
          <p
            className="text-white text-center my-auto cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Already Registered? Login
          </p>

          <div className="grid grid-cols-3 mt-8">
            <p className="text-white text-center">Terms & Conditions </p>
            <p className="text-white text-center">Support</p>
            <p className="text-white text-center">Customer Care</p>
          </div>
        </div>
      </div>
    </OnBoardingTemplate>
  );
};

export default EnterOtp;
