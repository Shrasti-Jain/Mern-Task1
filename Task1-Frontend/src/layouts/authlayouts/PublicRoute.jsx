import React from "react";
import { useNavigate } from "react-router";

const PublicRoute = () => {
    let navigate=useNavigate()

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">

      <nav className="px-6 py-4 flex items-center justify-between border-b border-gray-800/60">

        
        <div className="flex items-center space-x-2">

          
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-md"></div>

          <span className="text-2xl font-bold text-white">
            Learn<span className="text-purple-400">Log</span>
          </span>
        </div>

        <button onClick={()=>navigate('/login')} className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-500/30">
          Log In
        </button>
      </nav>

      
      <main className="flex-1 flex flex-col lg:flex-row">

        
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 space-y-6">

          
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Keep your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              learning organized
            </span>.
          </h1>

          <p className="text-lg text-gray-300 max-w-lg">
            LearnLog helps students track progress, reflect daily, and organize
            notes, tasks, and goals in one beautiful journal.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={()=>navigate('/register')} className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium transition shadow-lg shadow-blue-500/40 hover:shadow-blue-400/50">
              Get Started
            </button>

            <button onClick={()=>navigate('/login')} className="border cursor-pointer border-gray-600 hover:border-gray-400 hover:bg-gray-900 px-6 py-2.5 rounded-lg font-medium transition">
              View Demo
            </button>
          </div>
        </div>

        
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="bg-gray-950 rounded-2xl border border-gray-700 p-1 max-w-sm md:max-w-lg w-full overflow-hidden group">

            <div className="bg-black rounded-2xl border border-transparent overflow-hidden shadow-lg group-hover:border-purple-500 group-hover:shadow-[0_0_10px_2px_rgba(168,85,247,0.4)] transition-all duration-300">

              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800 px-4 py-3">
                <h3 className="text-sm font-medium text-gray-200">
                  Today's Log
                </h3>
              </div>

              <div className="divide-y divide-gray-800">

                <div className="px-4 py-3 hover:bg-gray-900 transition">
                  <p className="text-sm font-medium text-gray-300">
                    Study Session
                  </p>
                  <p className="text-xs text-gray-500">Maths – 2 hours</p>
                </div>

                <div className="px-4 py-3 hover:bg-gray-900 transition">
                  <p className="text-sm font-medium text-gray-300">
                    Reflection
                  </p>
                  <p className="text-xs text-gray-500">Finished notes</p>
                </div>

                <div className="px-4 py-3 hover:bg-gray-900 transition">
                  <p className="text-sm font-medium text-gray-300">
                    Task
                  </p>
                  <p className="text-xs text-gray-500">Read chapter 4</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

    
      <section className="px-6 py-12 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
            Perfect for students who want to…
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                title: "Track Learning",
                desc: "Log daily entries, tag skills, and visualize progress over time.",
              },
              {
                title: "Stay Focused",
                desc: "Set goals, track study hours, and reduce distractions.",
              },
              {
                title: "Reflect",
                desc: "Journal your thoughts, mistakes, and improvements each day.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 bg-gray-950 rounded-xl border border-gray-800 hover:border-purple-500 transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-100">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <footer className="px-6 py-4 text-center text-sm text-gray-500 border-t border-gray-800">
        © 2026 LearnLog • Student Learning Journal
      </footer>
    </div>
  );
};

export default PublicRoute;