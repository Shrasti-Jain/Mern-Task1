import React, { useRef, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router';

const ResetPage = () => {
   let {token}=useParams()
   let [isLoading,setIsLoading]=useState(false)
   let ref=useRef({})

  let handleSubmit=async (e)=>{
     e.preventDefault()
     let password=ref.current.password.value
     let confirmpassword=ref.current.confirmpassword.value

     if(password!= confirmpassword){ 
        toast.error("Password mismatch")
        return
     }

     let data={
      password,
      confirmpassword
     }

     try {
       setIsLoading(true) 
       let res=await axiosInstance.post(`/api/auth/user/update-password/${token}`,data)
       console.log(res);
       toast.success(res.data.message)
       ref.current.password.value=""
       ref.current.confirmpassword.value=""
     } 
     finally{
       setIsLoading(false)
     }
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-4'>

   
      <div className='w-full max-w-md rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl'>

        <form className='p-8 flex flex-col gap-5' onSubmit={handleSubmit}>

          
          <div className='text-center space-y-2'>
            <div className='flex items-center justify-center gap-2'>
              <span className='w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/30'></span>
              <h1 className='text-xl font-semibold text-white'>
                Reset Password
              </h1>
            </div>

            <p className='text-sm text-gray-500'>
              Enter your new secure password
            </p>
          </div>

          
          <input
            ref={(e)=>ref.current.password=e}
            className='w-full px-4 py-3 rounded-xl bg-white/5 border border-emerald-500/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition'
            required
            type="password"
            placeholder='Enter new password'
          />

          <input
            ref={(e)=>ref.current.confirmpassword=e}
            className='w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition'
            required
            type="password"
            placeholder='Confirm password'
          />

          
         <button
  disabled={isLoading}
  className={`w-full px-4 py-3 rounded-xl font-medium transition shadow-md shadow-emerald-500/20 ${
    isLoading
      ? "bg-gray-600 text-gray-300 cursor-not-allowed shadow-none"
      : "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white"
  }`}
>
  {isLoading ? "Resetting..." : "Reset Password"}
</button>

        </form>
      </div>
    </div>
  )
}

export default ResetPage