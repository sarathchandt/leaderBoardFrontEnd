import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Login from './Login'

const PrivateRoutes = () => {

    const [islogin,setIsLogin] = useState(true)
  return (
    islogin?<Outlet/>:<Login/>
  )
}

export default PrivateRoutes