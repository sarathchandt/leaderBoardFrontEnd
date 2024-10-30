import React, { useEffect, useState } from "react";
import GradientRound from "../components/GradientRound";
import "./common.css";
import OnBoardingTemplate from "../components/OnBoardingTemplate";
import GradientButton from "../components/GradientButton";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../lib/util";



const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState("")
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")

  const onSubmitFunction=(e)=>{
    e.preventDefault()
    if(isSubmitting) return
    
    const isValidEmail =  validateEmail(email)
    const  isValidPassWord = validatePassword(password)

    if(isValidEmail && isValidPassWord){
      setIsSubmitting(true)
    }else{
      setErrorMessage('The Email & Password must be in Proper form. And make sure everything filled without any additional space')
    }
    

  }
  

  return (
    <OnBoardingTemplate
      mainTitle="Welcome Back...!"
      firstRoundGradientStyle="absolute md:top-[10%] top-[15%]   left-[10%] md:left-0  rotate-90  bg-gradient-to-r from-[#530061] to-[#0D0A30]"
      secondRoundGradientStyle="absolute bottom-[10%]  right-[10%]  rotate-[40deg]  bg-gradient-to-r from-[#300061] to-[#0A1030]"
    >
      <div className="w-full h-full  relative ">
        <div className="w-full md:p-10 p-4  pt-10">
          <h3 className="text-white font-extrabold tracking-wide  md:text-3xl text-xl">
            Login
          </h3>
          <p className="text-white ">Glad you are back!</p>
          {errorMessage.length != 0 && <p className="text-red-600 ">{errorMessage}</p> }
          <form >
            <input
              type="email"
              className="w-full mt-6 bg-inherit border-[0.5px] rounded-[10px] py-2 px-4 text-white"
              placeholder="Email"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
            />
            <input
              type="text"
              className="w-full mt-6 bg-inherit border-[0.5px] rounded-[10px] py-2 px-4 text-white"
              placeholder="Password"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
            <GradientButton
              title="Login"
              onClick={onSubmitFunction}
              additionalStyles="w-full bg-gradient-to-r from-[#628EFF] via-[#8740CD] to-[#580475] p-2 text-white font-bold  rounded-[10px] my-6"
            />
          </form>
          <div className="flex flex-row justify-between w-full">
            <div className="w-5/12 h-[0.5px] bg-white my-auto"></div>
            <div className="text-white">or</div>
            <div className="w-5/12 bg-white h-[0.5px] my-auto"></div>
          </div>
          <GradientButton
            title="Admin Panel"
            onClick={(e) => {
              navigate('/adminLogin')
            }}
            additionalStyles="w-full bg-gradient-to-r from-[#628EFF] via-[#8740CD] to-[#580475] p-2 text-white font-bold  rounded-[10px] my-6"
          />
        </div>
        <div className="absolute bottom-0 w-full md:p-10 p-4  ">
          <p
            className="text-white text-center my-auto cursor-pointer"
            onClick={() => {
              navigate('/signup')
            }}
          >
            Don’t have an account ? Signup
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

export default Login;
