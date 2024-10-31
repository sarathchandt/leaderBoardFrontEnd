import React, { useEffect, useState } from 'react'
import { useStore } from '../store/store'
import { Outlet } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import { getAccessToken } from '../lib/tokenStorage'
import axiosInstance from '../lib/client'

const AdminPrivateRoute = () => {
    const [isLoading,setIsLoading] = useState(true)

    const isAdminLoggedIn = useStore(state=>state.isAdminLoggedIn)
    const setIsAdminLoggedIn = useStore(state => state.setIsAdminLoggedIn)
    console.log(isAdminLoggedIn);

    const checkUser = async()=>{
        try {
          setIsLoading(true)
          const access_token = getAccessToken()
          
          axiosInstance.defaults.headers['Authorization']  = `Bearer ${access_token}`
           const userData =  await  axiosInstance.get('/tokenCheck')
           console.log(userData.data);
           
           if(userData.data.isAdmin){
            setIsAdminLoggedIn(true)
           }
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      
        
      }
  
      useEffect(()=>{
        checkUser()
      },[])
    
  return (<>
      {isLoading && <div className="flex justify-center items-center w-screen h-screen text-whiteV1 text-7xl">Loading...</div>}
    {!isLoading && (isAdminLoggedIn ?<Outlet/>:<AdminLogin/>)}
  </>
  )
}

export default AdminPrivateRoute