import React, { useRef } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { useState } from "react";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef({});

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      fullname: ref.current.fullname.value,
      email: ref.current.email.value,
      password: ref.current.password.value,
      collegename: ref.current.collegename.value,
      course: ref.current.course.value,
    };

    try {
      const res = await axiosInstance.post("/api/auth/user/register", data);
      dispatch(setUser(res.data.data));
      toast.success("User registered successfully");
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-12">
    
      <div className="w-full max-w-lg rounded-xl border border-gray-800 bg-black/90 shadow-2xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-white">Get started with LearnLog</h1>
            <p className="text-sm text-gray-400 mt-1">Create your account and start learning.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <input
              ref={(e) => (ref.current.fullname = e)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-0 placeholder:text-gray-500 transition-all"
              required
              type="text"
              placeholder="Enter fullname"
            />

            
            <input
              ref={(e) => (ref.current.email = e)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-0 placeholder:text-gray-500 transition-all"
              required
              type="email"
              placeholder="Enter email"
            />

            
            <input
              ref={(e) => (ref.current.password = e)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-0 placeholder:text-gray-500 transition-all"
              required
              type="password"
              placeholder="Enter password"
            />

          
            <input
              ref={(e) => (ref.current.collegename = e)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-0 placeholder:text-gray-500 transition-all"
              type="text"
              placeholder="Enter college name"
            />

            
            <input
              ref={(e) => (ref.current.course = e)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-0 placeholder:text-gray-500 transition-all"
              type="text"
              placeholder="Enter course/branch"
            />

            
            <button
              disabled={isLoading}
              className={`w-full px-4 py-3 rounded-lg font-medium text-black mt-2 transition-all ${
                isLoading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-400 active:bg-emerald-500 shadow-md shadow-emerald-400/40"
              }`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          
          <p className="mt-4 text-sm text-gray-400 text-center">
            Already registered?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-emerald-600 hover:text-emerald-400 underline cursor-pointer"
            >
              Login now...
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;