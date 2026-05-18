import { Search, Plus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import TaskCard from '../components/TaskCard'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const TasksPage = () => {
  let navigate = useNavigate()
  let { tasks } = useSelector((state) => state.tasks)
  let [updatedData,setUpdatedData]=useState(tasks)
  let [data,setData]=useState({
     search:"",
    date:"",
    difficulty:"difficulty"
  })
  useEffect(()=>{
    setUpdatedData(tasks)
  },[tasks])

  useEffect(()=>{
    let newData=data
  let filtered = tasks;

  if (newData.search) {
    filtered = filtered.filter((task) =>
      task.topicname.toLowerCase().includes(newData.search.toLowerCase())
    );
  }
  if (newData.date) {
    const now = new Date();

    filtered = filtered.filter((task) => {
      const taskDate = new Date(task.createdAt);

      if (newData.date === "today") {
        return taskDate.toDateString() === now.toDateString();
      }

      if (newData.date === "last7") {
        const diff = (now - taskDate) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      }

      if (newData.date === "last30") {
        const diff = (now - taskDate) / (1000 * 60 * 60 * 24);
        return diff <= 30;
      }

      if (newData.date === "year") {
        return taskDate.getFullYear() === now.getFullYear();
      }

      return true;
    });
  }

  if (newData.difficulty && newData.difficulty !== "difficulty") {
    filtered = filtered.filter(
      (task) => task.difficultylevel === newData.difficulty
    );
  }

  setUpdatedData(filtered);
  },[data])
  let handleChange = (e) => {
  let newData = { ...data, [e.target.name]: e.target.value };
  setData(newData);
};


  return (
    <div className="min-h-screen w-full bg-[#070707] text-white px-4 sm:px-6 lg:px-10 py-6">

      <div className="mx-auto flex w-full max-w-10xl flex-col gap-6">

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            All Tasks
          </h1>
          <p className="text-sm text-gray-400">
            Manage and track your learning tasks efficiently.
          </p>
        </div>

        <div className="rounded-3xl bg-white/5 border-2 border-white/10 hover:border-white/20 transition p-4 sm:p-5">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

            <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus-within:border-emerald-400/40 transition">
              <Search size={18} className="text-gray-400" />
              <input 
                onChange={handleChange} name="search"
                type="text"
                placeholder="Search tasks"
                className="w-full bg-transparent text-sm outline-none text-white placeholder:text-gray-500"
              />
            </div>

            
            <select  onChange={handleChange} name="date" className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none hover:border-white/25 transition">
              <option value="" className='bg-black text-white'>Filter By Date</option>
              <option value="today" className='bg-black text-white'>Today</option>
              <option value="Last7" className='bg-black text-white'>Last 7 days</option>
              <option value="Last30" className='bg-black text-white'>Last 30 days</option>
              <option value="ThisYear" className='bg-black text-white'>This Year</option>
            </select>

           
            <select onChange={handleChange} name="difficulty" className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none hover:border-white/25 transition">
              <option value="difficulty" className='bg-black text-white'>Filter By Difficulty</option>
              <option value="Low" className='bg-black text-white'>Low</option>
              <option  value="Medium" className='bg-black text-white'>Medium</option>
              <option value="Hard" className='bg-black text-white'>Hard</option>
            </select>

           {
            data.search!="" || data.date!="" || data.difficulty!="difficulty"?
           <button
  onClick={() => {
    setData({
      search: "",
      date: "",
      difficulty: "difficulty",
    });
    setUpdatedData(tasks);
  }}
  className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 
             hover:bg-red-500/20 hover:border-red-400 transition 
             text-sm font-medium flex items-center gap-2"
>
  Clear Filters
</button>:null
           }
            <button
              onClick={() => navigate('/home/create-task')}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black font-medium px-5 py-3 hover:bg-emerald-400 transition"
            >
              <Plus size={18} />
              Create Task
            </button>

          </div>

        </div>

        
        {updatedData.length ? (
          <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {updatedData.map((elem) => (
              <TaskCard key={elem._id} elem={elem} />
            ))}

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg">No Tasks Available</p>
            <p className="text-sm mt-1">Create your first learning task</p>
          </div>
        )}

      </div>

    </div>
  )
}

export default TasksPage