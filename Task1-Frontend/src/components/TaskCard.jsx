import React from 'react'
import { axiosInstance } from '../config/axiosInstance'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { removeTask } from '../features/taskSlice'
import { useNavigate } from 'react-router'

const TaskCard = ({ elem }) => {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let removeHandle = async () => {
    let res = await axiosInstance.get(`/tasks/delete-task/${elem._id}`)
    toast.success(res.data.message)
    dispatch(removeTask(elem._id))
  }

  let handleEdit = () => {
    navigate(`/home/edit-task/${elem._id}`)
  }

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white/5 border-2 border-white/10 hover:border-emerald-400/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.12)] transition-all duration-200 p-5 text-white">

      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-xs text-gray-400">
  {new Date(elem.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
</p>

          <h1 className="mt-1 text-lg font-semibold text-white break-words">
            {elem.topicname}
          </h1>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 whitespace-nowrap">
          {elem.difficultylevel}
        </span>

      </div>

      <p className="mt-4 text-sm text-gray-400 leading-relaxed line-clamp-3">
        {elem.description}
      </p>

    
      <div className="mt-4 text-sm text-gray-300">
        Study Duration:{" "}
        <span className="text-white font-medium">
          {elem.duration || 0} hrs
        </span>
      </div>

      
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <span className="w-fit text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          {elem.difficultylevel}
        </span>

        <div className="flex gap-2 w-full sm:w-auto">

          <button
            onClick={handleEdit}
            className="flex-1 cursor-pointer sm:flex-none px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-emerald-400/40 hover:bg-white/15 text-sm transition"
          >
            Edit
          </button>

          <button
            onClick={removeHandle}
            className="flex-1 cursor-pointer sm:flex-none px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-400/40 text-red-300 hover:text-red-200 text-sm transition"
          >
            Remove
          </button>

        </div>

      </div>

    </div>
  )
}

export default TaskCard