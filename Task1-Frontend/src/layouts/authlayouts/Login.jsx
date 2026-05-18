import React, { useRef, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [isLoading,setIsLoading]=useState(false)
  const ref = useRef({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: ref.current.email.value,
      password: ref.current.password.value,
    };

    try {
      setIsLoading(true)
      const res = await axiosInstance.post("/api/auth/user/login", data);
      dispatch(setUser(res.data.data));
      toast.success("User logged in successfully");
    } finally {
        setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-12 font-sans">
      
      <div className="w-full max-w-md bg-black rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-xl font-semibold text-white">Welcome back to LearnLog</h1>
          <p className="text-sm text-gray-400 mt-1 mb-6">Sign in to continue.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
            <input
              ref={(e) => (ref.current.email = e)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-0 transition-all"
              required
              type="email"
              placeholder="Enter email"
            />

            
            <input
              ref={(e) => (ref.current.password = e)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-0 transition-all"
              required
              type="password"
              placeholder="Enter password"
            />

            
            <button type="submit" disabled={isLoading}
        className={`w-full px-4 py-3 rounded-lg font-medium transition-all shadow-md ${
        isLoading
      ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
      : "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-emerald-400/30"
       }`}
>
  {isLoading ? "Logging in..." : "Login"}
</button>
          </form>

        
          <p
            onClick={() => navigate("/forget")}
            className="mt-3 text-sm text-emerald-600 hover:text-emerald-400 underline cursor-pointer text-center"
          >
            Forgot password?
          </p>

    
          <p className="mt-4 text-sm text-gray-400 text-center">
            Not registered yet?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-emerald-600 hover:text-emerald-400 underline cursor-pointer"
            >
              Register now...
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;