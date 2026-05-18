import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const AuthRoute = () => {
  let {loading}=useSelector((state)=>state.loading)
  let {user}=useSelector((state)=>state.user)
  
  if(loading)return <h1>Loading...</h1>

  if(user){
    return <Navigate to='/home'/>
  }

  return <Outlet/>
}

export default AuthRoute