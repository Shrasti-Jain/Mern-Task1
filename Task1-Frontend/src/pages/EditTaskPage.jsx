import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../config/axiosInstance'
import { toast } from 'react-toastify'
import { updateTask } from '../features/taskSlice'

const EditTaskPage = () => {
  let { id } = useParams()
  let { tasks } = useSelector((state) => state.tasks)
  let task = tasks.find(t => t._id == id)
   let [isLoading,setIsLoading]=useState(false)
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let [isEditing, setIsEditing] = useState(false)

  let [data, setData] = useState({
    topicname: "",
    description: "",
    duration: 0,
    difficultylevel: "Low"
  })

  let handleChange = async () => {
try{  
  setIsLoading(true)
      let res = await axiosInstance.post(`/tasks/update-task/${id}`, data)
    dispatch(updateTask(res.data.data))
    toast.success(res.data.message)
    navigate(-1)
} finally{
  setIsLoading(false)
}
  }

  useEffect(() => {
    setData({
      topicname: task?.topicname || "",
      description: task?.description || "",
      duration: task?.duration || 0,
      difficultylevel: task?.difficultylevel || "Low"
    })
  }, [])

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-4">

      
      <div className="w-full max-w-xl rounded-3xl bg-white/5 border-2 border-white/10 hover:border-emerald-400/30 transition p-6 sm:p-8">

        
        <h1 className="text-2xl font-semibold text-center mb-6">
          Edit <span className="text-emerald-400">Task</span>
        </h1>

      
        <div className="flex justify-center gap-3 mb-6">

          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              >
                Cancel
              </button>

              <button
  disabled={isLoading}
  onClick={handleChange}
  className={`px-4 py-2 rounded-xl font-medium transition ${
    isLoading
      ? "bg-emerald-700 cursor-not-allowed text-white/70"
      : "bg-emerald-500 hover:bg-emerald-400 text-black"
  }`}
>
  {isLoading ? "Saving..." : "Save Changes"}
</button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition"
            >
              Edit Task
            </button>
          )}

        </div>

        
        <div className="flex flex-col gap-4">

          <input
            disabled
            value={data.topicname}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
            type="text"
          />

          <input
            onChange={(e) => setData({ ...data, description: e.target.value })}
            disabled={!isEditing}
            value={data.description}
            className={`px-4 py-3 rounded-xl outline-none transition ${
              isEditing
                ? "bg-white/5 border border-white/10 focus:border-emerald-400/40"
                : "bg-white/5 border border-white/10 text-gray-500"
            }`}
            type="text"
            placeholder="Description"
          />

          <input
            onChange={(e) => setData({ ...data, duration: e.target.value })}
            disabled={!isEditing}
            value={data.duration}
            className={`px-4 py-3 rounded-xl outline-none transition ${
              isEditing
                ? "bg-white/5 border border-white/10 focus:border-emerald-400/40"
                : "bg-white/5 border border-white/10 text-gray-500"
            }`}
            type="number"
            placeholder="Duration"
          />

          <select
            onChange={(e) =>
              setData({ ...data, difficultylevel: e.target.value })
            }
            disabled={!isEditing}
            value={data.difficultylevel}
            className={`px-4 py-3 rounded-xl outline-none transition ${
              isEditing
                ? "bg-white/5 border border-white/10 focus:border-emerald-400/40"
                : "bg-white/5 border border-white/10 text-gray-500"
            }`}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

        </div>

      </div>
    </div>
  )
}

export default EditTaskPage