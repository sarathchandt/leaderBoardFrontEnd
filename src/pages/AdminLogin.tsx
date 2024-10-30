import React, { useState } from 'react'
import OnBoardingTemplate from '../components/OnBoardingTemplate';
import GradientButton from '../components/GradientButton';
import { useNavigate } from 'react-router-dom';
import { validateAdmin } from '../lib/util';

const AdminLogin = () => {

    const navigate = useNavigate()

    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage,setErrorMessage] = useState('')

    
    const submitFunction = (e) =>{
        e.preventDefault()
   const isUSerValid =      validateAdmin(userName)
   const isPassWordValid = validateAdmin(password)

        if(isPassWordValid && isUSerValid){

        }else{
            setErrorMessage('Please make sure about the credentials')
        }
    }
  return (
    <OnBoardingTemplate
      mainTitle="Welcome Sir"
      firstRoundGradientStyle="absolute md:top-[10%] top-[15%]   left-[10%] md:left-0  rotate-90  bg-gradient-to-r from-[#61003A] to-[#2D0A30]"
      secondRoundGradientStyle="absolute bottom-[10%]  right-[10%]  rotate-[40deg]  bg-gradient-to-r from-[#61004B] to-[#220A30]"
    >
      <div className="w-full h-full  relative ">
        <div className="w-full md:p-10 p-4  pt-10">
          <h3 className="text-white font-extrabold tracking-wide  md:text-3xl text-xl">
            Admin
          </h3>
          <p className="text-white ">There are new things..hurry up!</p>
          {errorMessage.length != 0 && <p className="text-red-600 text-sm md:text-lg ">{errorMessage}</p> }

          <form action="">
            <input
              type="text"
              className="w-full mt-6 bg-inherit border-[0.5px] rounded-[10px] py-2 px-4 text-white"
              placeholder="User Name"
              value={userName}
              onChange={(e)=>{
                setUserName(e.target.value)
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
              title="Enter"
              onClick={submitFunction}
              additionalStyles="w-full bg-gradient-to-r from-[#E948C5] via-[#CD407B] to-[#75042D] p-2 text-white font-bold  rounded-[10px] my-6"
            />
          </form>
        
       
        </div>
        <div className="absolute bottom-0 w-full md:p-10 p-4  ">
          <p
            className="text-white text-center my-auto cursor-pointer"
            onClick={() => {
              navigate('/')
            }}
          >
            Have you lost..?
          </p>

          <div className="grid grid-cols-3 mt-8">
            <p className="text-white text-center">Terms & Conditions </p>
            <p className="text-white text-center">Support</p>
            <p className="text-white text-center">Customer Care</p>
          </div>
        </div>
      </div>
    </OnBoardingTemplate>
  )
}

export default AdminLogin