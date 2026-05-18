import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
   let {loading}=useSelector((state)=>state.loading)
    let {user}=useSelector((state)=>state.user)
  if (loading) {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-14 h-14 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
    </div>
  );
}
    
  if(!user){
    return <Navigate to='/'/>
  }
  return <Outlet/>
}

export default ProtectedRoute
