import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
   let {loading}=useSelector((state)=>state.loading)
    let {user}=useSelector((state)=>state.user)
    if(loading)return <h1>Loading...</h1>
    
  if(!user){
    return <Navigate to='/'/>
  }
  return <Outlet/>
}

export default ProtectedRoute
