import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const MainPage = () => {
  return (
    <div className='bg-black h-screen w-full flex flex-col'>

      <Navbar />

      <div className='flex-1 overflow-y-auto p-5'>
        <Outlet />
      </div>

    </div>
  )
}

export default MainPage