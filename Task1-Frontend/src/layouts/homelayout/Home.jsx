import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ViewCard from "../../components/ViewCard";

const Home = () => {
  let { user } = useSelector((state) => state.user);
  let navigate = useNavigate();
  let { tasks } = useSelector((state) => state.tasks);

  let recentTasks = tasks.slice(0, 5);

  let totalhours = 0;
  tasks.forEach((e) => (totalhours += e.duration));

  let maxHour = 0;
  tasks.forEach((e) => (maxHour = Math.max(maxHour, e.duration)));

  let minHour = 10000;
  tasks.forEach((e) => (minHour = Math.min(minHour, e.duration)));

  return (
    <div className="min-h-screen w-full bg-[#070707] text-white px-4 sm:px-8 py-6">

      
      <div className="w-full rounded-3xl bg-white/5 border-2 border-white/15 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition backdrop-blur-xl p-6 sm:p-8">

        <p className="text-sm text-gray-400">Welcome back</p>

        <h1 className="text-2xl sm:text-4xl font-semibold mt-1">
          {user?.fullname} 👋
        </h1>

        <p className="text-gray-400 mt-3 max-w-xl text-sm sm:text-base">
          Track your learning progress and build consistency every day.
        </p>

        <div className="mt-5 flex gap-3 flex-wrap">
          <button
            onClick={() => navigate("/home/tasks")}
            className="px-5 cursor-pointer py-2 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition shadow-md shadow-emerald-500/20"
          >
            Continue Learning
          </button>

          <button onClick={() => navigate("/home/tasks")} className="px-5 cursor-pointer py-2 rounded-xl bg-white/5 border-2 border-white/15 hover:border-white/30 hover:bg-white/10 transition">
            View Insights
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

        <div className="rounded-2xl bg-white/5 border-2 border-white/15 hover:border-emerald-400/50 hover:shadow-md hover:shadow-emerald-500/10 transition p-5">
          <p className="text-xs text-gray-400">Total Tasks</p>
          <h2 className="text-2xl font-semibold mt-1">{tasks.length}</h2>
        </div>

        <div className="rounded-2xl bg-white/5 border-2 border-white/15 hover:border-cyan-400/50 hover:shadow-md hover:shadow-cyan-500/10 transition p-5">
          <p className="text-xs text-gray-400">Study Hours</p>
          <h2 className="text-2xl font-semibold mt-1">{totalhours}</h2>
        </div>

        <div className="rounded-2xl bg-white/5 border-2 border-white/15 hover:border-purple-400/50 hover:shadow-md hover:shadow-purple-500/10 transition p-5">
          <p className="text-xs text-gray-400">Longest Session</p>
          <h2 className="text-2xl font-semibold mt-1">{maxHour}</h2>
        </div>

        <div className="rounded-2xl bg-white/5 border-2 border-white/15 hover:border-pink-400/50 hover:shadow-md hover:shadow-pink-500/10 transition p-5">
          <p className="text-xs text-gray-400">Shortest Session</p>
          <h2 className="text-2xl font-semibold mt-1">{minHour}</h2>
        </div>

      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        
        <div className="lg:col-span-2 flex flex-col gap-6">

          
          <div className="rounded-3xl bg-white/5 border-2 border-white/15 hover:border-white/30 transition p-6">

            <h2 className="text-lg font-semibold">Learning Insights</h2>

            <p className="text-sm text-gray-400 mt-2">
              Your consistency is improving. Keep building your daily learning habit.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs text-gray-300">
                Consistency
              </span>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                Growth
              </span>

              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300">
                Focus
              </span>
            </div>

          </div>

          
           
          <div className="rounded-3xl bg-gradient-to-r from-white/5 to-black border-2 border-white/15 hover:border-emerald-400/40 transition p-6 flex flex-col gap-5">

  
  <div>
    <h3 className="text-lg font-semibold">
      Continue your learning journey
    </h3>

    <p className="text-sm text-gray-400 mt-1">
      Pick up where you left off
    </p>
  </div>

  
  <div className="flex gap-4">

    
    <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-emerald-400/30 transition">
      <p className="text-xs text-gray-400">Today</p>
      <p className="text-sm mt-1">Complete pending tasks</p>
    </div>

    
    <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-cyan-400/30 transition">
      <p className="text-xs text-gray-400">Focus</p>
      <p className="text-sm mt-1">Stay consistent daily</p>
    </div>

  </div>

  
  <button
    onClick={() => navigate("/home/tasks")}
    className="w-fit px-6 py-2 cursor-pointer rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition shadow-md shadow-emerald-500/20"
  >
    Open Tasks
  </button>

</div>
           
        

        </div>

        
        <div className="rounded-3xl bg-white/5 border-2 border-white/15 hover:border-white/30 transition p-5">

          <h2 className="text-md text-gray-300 mb-4 font-semibold">
            Recent Learning Logs
          </h2>

         
      <div className="flex flex-col gap-3 h-[300px] overflow-y-auto pr-2">
  {recentTasks.length ? (
    recentTasks.map((e) => (
      <div key={e._id} className="hover:scale-[1.01] transition">
        <ViewCard e={e} />
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500 text-center">
      No tasks yet
    </p>
  )}
</div>

        </div>

      </div>

    </div>
  );
};

export default Home;