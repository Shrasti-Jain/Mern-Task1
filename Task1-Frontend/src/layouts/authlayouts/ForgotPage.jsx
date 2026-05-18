import React, { useRef, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router';

const ForgotPage = () => {
   let [isLoading,setIsLoading]=useState(false)
  let ref=useRef({})
  let navigate = useNavigate();

  let handleSubmit=async (e)=>{
     e.preventDefault()
     let data={
      email:ref.current.email.value,
     }
     try {
        setIsLoading(true)
        let res=await axiosInstance.post('/api/auth/user/forget-password',data)
        toast.success("Mail sent successfully")
     } catch (error) {
        toast.error(error.response.data.message);
     }
     finally{
      setIsLoading(false)
     }
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-4'>

      
      <div className='w-full max-w-md rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl'>

        <form onSubmit={handleSubmit} className='p-8 flex flex-col gap-5'>

          
          <div className='text-center space-y-2'>
            <div className='flex items-center justify-center gap-2'>
              <span className='w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/30'></span>
              <h1 className='text-xl font-semibold text-white'>
                Forgot Password
              </h1>
            </div>

            <p className='text-sm text-gray-500'>
              Enter your email to receive reset link
            </p>
          </div>

          
          <input
            ref={(e)=>ref.current.email=e}
            className='w-full px-4 py-3 rounded-xl bg-white/5 border border-emerald-500/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition'
            required
            type="email"
            placeholder='Enter email'
          />

          
          <button disabled={isLoading}
         className={`w-full px-4 py-3 rounded-xl font-medium transition shadow-md shadow-emerald-500/20 ${
          isLoading
      ? "bg-gray-600 text-gray-300 cursor-not-allowed shadow-none"
      : "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white"
         }`}
>
         {isLoading ? "Sending..." : "Reset link"}
         </button>

          
          <p className='text-sm text-gray-500 text-center'>
            Remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className='text-emerald-400 hover:text-emerald-300 underline cursor-pointer'
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default ForgotPage