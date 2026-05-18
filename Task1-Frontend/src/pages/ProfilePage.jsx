import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { axiosInstance } from '../config/axiosInstance'
import { removeUser, setUser } from '../features/userSlice'
import { deleteall } from '../features/taskSlice'

const ProfilePage = () => {
  let { user } = useSelector((state) => state.user)
  let [isEditing, setIsEditing] = useState(false)
  let [saving,setSaving]=useState(false)
  let dispatch = useDispatch()
  let fileref = useRef({})

  let [data, setData] = useState({
    fullname: "",
    email: "",
    collegename: "",
    course: ""
  })

  let handleprofile = async (e) => {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append("image", file)

    let res = await axiosInstance.post('/user/upload-image', formData)
    toast.success(res.data.message)
    dispatch(setUser(res.data.data))
  }

  useEffect(() => {
    if (user) {
      setData({
        fullname: user.fullname || "",
        email: user.email || "",
        collegename: user.collegename || "",
        course: user.course || ""
      })
    }
  }, [user])

  let handleSubmit = (e) => e.preventDefault()

  let logoutHandler = async () => {
    let res = await axiosInstance.get(`/user/logout`)
    dispatch(deleteall())
    toast.success(res.data.message)
    dispatch(removeUser())
  }

  let handleChanges = async () => {
    if (data.fullname === "") return toast.error("Name is required")

   try{
    setSaving(true)
     let res = await axiosInstance.post('/user/update-profile', data)
    dispatch(setUser(res.data.data))
    toast.success(res.data.message)
   }
    finally{
      setIsEditing(false)
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#070707] text-white p-4 sm:p-6 lg:p-10">

      
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h1 className="text-2xl sm:text-3xl font-semibold">
          Personal <span className="text-emerald-400">Profile</span>
        </h1>

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:border-white/20 transition"
              >
                Cancel
              </button>
          <button
          onClick={handleChanges}
        disabled={saving}
         className={`px-4 py-2 rounded-xl font-medium transition ${
        saving
      ? "bg-emerald-700 cursor-not-allowed text-white/70"
      : "bg-emerald-500 hover:bg-emerald-400 text-black"
         }`}
        >
  {saving ? "Saving..." : "Save"}
</button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:border-emerald-400/40 transition"
              >
                Edit
              </button>

              <button
                onClick={logoutHandler}
                className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:border-red-400/40 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

        
        <div className="lg:col-span-4 rounded-3xl bg-white/5 border-2 border-white/10 hover:border-emerald-400/30 transition p-6 flex flex-col items-center justify-center gap-4">

          <div
            onClick={() => fileref.current.click()}
            className="h-40 w-40 rounded-full overflow-hidden border-2 border-emerald-400/30 cursor-pointer hover:scale-105 transition"
          >
            <img
              className="h-full w-full object-cover"
              src={
                user.imageUrl !== ""
                  ? user.imageUrl
                  : "https://img.freepik.com/premium-vector/icono-perfil-simple-color-blanco-icon_1076610-50204.jpg"
              }
              alt=""
            />
          </div>

          <p className="text-xs text-gray-400">
            Click to change profile photo
          </p>

          <input
            onChange={handleprofile}
            ref={fileref}
            type="file"
            className="hidden"
            accept="image/*"
          />
        </div>

        
        <div className="lg:col-span-8 rounded-3xl bg-white/5 border-2 border-white/10 hover:border-emerald-400/30 transition p-6 sm:p-8">

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <input
              value={data.fullname}
              onChange={(e) => setData({ ...data, fullname: e.target.value })}
              disabled={!isEditing}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/40 outline-none"
              placeholder="Full Name"
            />

            <input
              value={data.email}
              disabled
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
              placeholder="Email"
            />

            <input
              value={data.collegename}
              onChange={(e) => setData({ ...data, collegename: e.target.value })}
              disabled={!isEditing}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/40 outline-none"
              placeholder="College Name"
            />

            <input
              value={data.course}
              onChange={(e) => setData({ ...data, course: e.target.value })}
              disabled={!isEditing}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/40 outline-none"
              placeholder="Course / Branch"
            />

          </form>

        </div>

      </div>

    </div>
  )
}

export default ProfilePage