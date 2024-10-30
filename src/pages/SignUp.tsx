import React, { useState } from "react";
import OnBoardingTemplate from "../components/OnBoardingTemplate";
import GradientButton from "../components/GradientButton";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../lib/util";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isCalledSignup,setIsCalledSignup] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')

  const submitFunction = (e) => {
    e.preventDefault();

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValidRePassword = password === rePassword;
    const isValidName = name.length !== 0;

    if (isValidEmail && isValidName && isValidPassword && isValidRePassword) {

        setIsCalledSignup(true)
    }else{
        
        setErrorMessage('The input values must be in Proper form. And make sure everything filled without any additional space')
    }
  };

  return (
    <OnBoardingTemplate
      mainTitle="Roll the Carpet.!"
      firstRoundGradientStyle="absolute md:top-[10%] top-[15%]   left-[10%] md:left-0  rotate-90  bg-gradient-to-r from-[#190061] to-[#0A1B30]"
      secondRoundGradientStyle="absolute bottom-[10%]  right-[10%]  rotate-[40deg]  bg-gradient-to-r from-[#000F61] to-[#0A1730]"
    >
      <div className="w-full h-full  relative ">
        <div className="w-full md:p-10 p-4  pt-10">
          <h3 className="text-white font-extrabold tracking-wide  md:text-3xl text-xl">
            Signup
          </h3>
          <p className="text-white ">Just some details to get you in.!</p>
          {errorMessage.length != 0 && <p className="text-red-600 text-sm md:text-lg ">{errorMessage}</p> }
          <form>
            <input
              type="text"
              className="w-full mt-6 bg-inherit border-[0.5px] rounded-[10px] py-2 px-4 text-white"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              className="w-full mt-6 bg-inherit border-[0.5px] rounded-[10px] py-2 px-4 text-white"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              className="w-full mt-6 bg-inherit border-[0.5px] rounded-[10px] py-2 px-4 text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassWord(e.target.value);
              }}
            />
            <input
              type="text"
              className="w-full mt-6 bg-inherit border-[0.5px] rounded-[10px] py-2 px-4 text-white"
              placeholder="Confirm Password"
              value={rePassword}
              onChange={(e) => {
                setRePassword(e.target.value);
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

export default SignUp;
