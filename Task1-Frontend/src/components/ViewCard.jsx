import React from 'react'
import { useNavigate } from 'react-router'

const ViewCard = ({ e }) => {
  let navigate = useNavigate()

  return (
    <div className="w-full h-20 px-4 rounded-2xl bg-white/5 border-2 border-white/10 hover:border-emerald-400/40 hover:bg-white/10 transition flex items-center justify-between">

      <div className="flex flex-col">
        <h1 className="text-sm font-medium text-white truncate max-w-[180px]">
          {e.topicname}
        </h1>

        <p className="text-xs text-gray-400">
          {e.difficultylevel} • {e.duration || 0} hrs
        </p>
      </div>

      <button
        onClick={() => navigate('/home/tasks')}
        className="px-3 py-1.5 text-xs rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition"
      >
        View
      </button>

    </div>
  )
}

export default ViewCard