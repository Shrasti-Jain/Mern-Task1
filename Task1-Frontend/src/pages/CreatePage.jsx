import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/taskSlice'

const CreatePage = () => {
  let navigate = useNavigate()
  let ref = useRef({})
  let [isLoading,setIsLoading]=useState()
  let dispatch = useDispatch()

  let handleSubmit = async (e) => {
    e.preventDefault()
    let duration = ref.current.duration.value

    if (duration < 0) {
      toast.error("Invalid duration")
      return
    }

    let data = {
      topicname: ref.current.topicname.value,
      description: ref.current.description.value,
      duration,
      difficultylevel: ref.current.difficultylevel.value
    }

    try{
      setIsLoading(true)
      let res = await axiosInstance.post('/tasks/create', data)
    toast.success(res.data.message)
    dispatch(addTask(res.data.data))
    navigate(-1)
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#070707] text-white flex items-center justify-center px-4">

      
      <X
        onClick={() => navigate(-1)}
        className="absolute top-20 right-6 cursor-pointer text-gray-400 hover:text-white transition"
      />

      
      <div className="w-full max-w-lg rounded-3xl bg-white/5 border-2 border-white/10 hover:border-emerald-400/30 transition p-6 sm:p-8 shadow-lg">

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create <span className="text-emerald-400">Task</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          
          <input
            required
            maxLength={10}
            ref={(e) => (ref.current.topicname = e)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/40 outline-none transition"
            type="text"
            placeholder="Topic name"
          />

          
          <input
            ref={(e) => (ref.current.description = e)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/40 outline-none transition"
            type="text"
            placeholder="Description"
          />

          <input
  ref={(e) => (ref.current.duration = e)}
  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/40 outline-none transition"
  type="number"
  min="0"
  step="1"
  placeholder="Study duration (hrs)"
/>

          
          <select
            ref={(e) => (ref.current.difficultylevel = e)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/40 outline-none transition"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

        
         <button
  disabled={isLoading}
  className={`mt-2 px-4 py-3 rounded-xl font-medium transition shadow-md shadow-emerald-500/20 ${
    isLoading
      ? "bg-emerald-700 cursor-not-allowed text-white/70"
      : "bg-emerald-500 hover:bg-emerald-400 text-black"
  }`}
>
  {isLoading ? "Creating..." : "Create Task"}
</button>

        </form>

      </div>
    </div>
  )
}

export default CreatePage