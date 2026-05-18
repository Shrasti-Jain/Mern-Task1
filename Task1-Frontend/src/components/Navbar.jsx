import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { ChevronDown, Menu, X } from 'lucide-react';
import { axiosInstance } from '../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { removeUser } from '../features/userSlice';
import { deleteall } from '../features/taskSlice';

const Navbar = () => {
  let [drop, setDrop] = useState(false)
  let [mobileMenu, setMobileMenu] = useState(false)

  let { user } = useSelector((state) => state.user)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let logoutHandler = async () => {
    let res = await axiosInstance.get(`/user/logout`)
    dispatch(deleteall())
    toast.success(res.data.message)
    dispatch(removeUser())
  }

  return (
    <div className="h-[8%] relative z-50 w-full flex items-center justify-between px-6 md:px-10 bg-black/60 backdrop-blur-md border-b border-white/10">

    
      <h1 className="text-lg font-semibold text-white tracking-wide">
        <span className="text-emerald-400">Learn</span>Log
      </h1>

      
      <div className="hidden md:flex gap-6 items-center text-sm">
        <NavLink 
         onClick={()=>setDrop(false)}
          to="/home"
          end
          className={({ isActive }) =>
            isActive
              ? "text-emerald-400 font-bold"
              : "text-gray-400 font-bold hover:text-white transition"
          }
        >
          Home
        </NavLink>

        <NavLink
         onClick={()=>setDrop(false)}
          to="/home/tasks"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-400 font-bold"
              : "text-gray-400 font-bold hover:text-white transition"
          }
        >
          Tasks
        </NavLink>

        <NavLink
         onClick={()=>setDrop(false)}
          to="/home/contact"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-400 font-bold"
              : "text-gray-400 font-bold hover:text-white transition"
          }
        >
          Contact
        </NavLink>
      </div>

      
      <div className="flex items-center gap-3 relative">

        
        <div className="h-9 w-9 rounded-full border border-emerald-500/30 overflow-hidden cursor-pointer">
          <img
            className="h-full w-full object-cover"
            src={
              user.imageUrl !== ""
                ? user.imageUrl
                : "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
            }
            alt=""
          />
        </div>

        
        <ChevronDown
          onClick={() => setDrop(prev => !prev)}
          className="cursor-pointer text-gray-300 hover:text-white transition"
          size={18}
        />

        
        <div className="md:hidden ml-2">
          {mobileMenu ? (
            <X onClick={() => setMobileMenu(false)} className="text-white cursor-pointer" />
          ) : (
            <Menu onClick={() => setMobileMenu(true)} className="text-white cursor-pointer" />
          )}
        </div>

        
        {drop && (
          <div className="absolute top-12 right-0 z-50 w-40 rounded-xl border border-white/10 bg-black/90 backdrop-blur-md shadow-xl overflow-hidden text-sm">

            <div
              onClick={() => {
                navigate('/home/profile')
                setDrop(false)
              }}
              className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-emerald-400 cursor-pointer transition"
            >
              Profile
            </div>

            <div className="h-px bg-white/10"></div>

            <div
              onClick={logoutHandler}
              className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-red-400 cursor-pointer transition"
            >
              Logout
            </div>

          </div>
        )}

      </div>

    
      {mobileMenu && (
        <div className="absolute top-[100%] left-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-white/10 flex flex-col md:hidden p-5 gap-4 text-sm">

          <NavLink
            onClick={() => setMobileMenu(false)}
            to="/home"
            end
            className="text-gray-300 hover:text-emerald-400"
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setMobileMenu(false)}
            to="/home/tasks"
            className="text-gray-300 hover:text-emerald-400"
          >
            Tasks
          </NavLink>

          <NavLink
            onClick={() => setMobileMenu(false)}
            to="/home/contact"
            className="text-gray-300 hover:text-emerald-400"
          >
            Contact
          </NavLink>

        </div>
      )}

    </div>
  )
}

export default Navbar