import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Login from './Login'
import axiosInstance from '../lib/client'
import { useStore } from '../store/store'
import { getAccessToken } from '../lib/tokenStorage'

const PrivateRoutes = () => {

  const islogin = useStore(state=>state.isUserLoggedIn)
  const setIsLogin =  useStore(state=>state.setIsUserLoggedIn)
  const setUserData = useStore(state => state.setUserData)
  const setIsAdminLoggedIn = useStore(state=>state.setIsAdminLoggedIn)

  const [isLoading,setIsLoading] = useState(true)


    const checkUser = async()=>{
      try {
        setIsLoading(true)
        const access_token = getAccessToken()
        
        axiosInstance.defaults.headers['Authorization']  = `Bearer ${access_token}`
         const userData =  await  axiosInstance.get('/tokenCheck')
         if(userData.data.isAdmin){
          setIsAdminLoggedIn(true)
         }else{
           setUserData(userData.data);
           
           setIsLogin(true)
          }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setIsLogin(false)
      }
    
      
    }

    useEffect(()=>{
      checkUser()
    },[])
  return (
    <>
    {isLoading && <div className="flex justify-center items-center w-screen h-screen text-whiteV1 text-7xl">Loading...</div>}
   {!isLoading && (islogin?<Outlet/>:<Login/>)}
    </>
  )
}

export default PrivateRoutes