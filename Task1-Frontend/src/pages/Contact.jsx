import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-[#070707] text-white px-4 sm:px-6 lg:px-10 py-8">

      <div className="max-w-6xl mx-auto flex flex-col gap-8">

      
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Contact <span className="text-emerald-400">Us</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? We’re here to help you improve your learning experience.
          </p>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          
          <div className="rounded-3xl bg-white/5 border-2 border-white/10 hover:border-emerald-400/30 transition p-6 sm:p-8">

            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              About LearnLog
            </h2>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              LearnLog is a student-focused learning tracker where you can log daily study sessions,
              manage topics, and monitor your progress over time.
            </p>

            <p className="text-sm sm:text-base text-gray-400 mt-4 leading-relaxed">
              It helps you stay consistent, build habits, and improve productivity in a simple and clean way.
            </p>

          </div>

          
          <div className="rounded-3xl bg-white/5 border-2 border-white/10 hover:border-emerald-400/30 transition p-6 sm:p-8 flex flex-col justify-between gap-6">

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Get in Touch
              </h2>

              <p className="text-sm text-gray-400 mb-6">
                We usually respond within 24–48 hours.
              </p>

              
              <div className="flex flex-col gap-4">

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/30 transition">
                  <span className="text-sm text-gray-300">Email</span>
                  <span className="text-sm text-emerald-400">
                    support@learnlog.com
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/30 transition">
                  <span className="text-sm text-gray-300">Instagram</span>
                  <span className="text-sm text-emerald-400">
                    @learnlog
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/30 transition">
                  <span className="text-sm text-gray-300">Response</span>
                  <span className="text-sm text-gray-400">
                    24–48 hours
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;