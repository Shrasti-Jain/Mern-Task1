import React from 'react'
import {RouterProvider,createBrowserRouter} from 'react-router'
import AuthRoute from '../pages/AuthRoute'
import Login from '../layouts/authlayouts/Login'
import Register from '../layouts/authlayouts/Register'
import ProtectedRoute from '../pages/ProtectedRoute'
import Home from '../layouts/homelayout/Home'
import { useEffect } from 'react'
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/userSlice'
import {removeLoading} from '../features/loadingSlice'
import ForgotPage from '../layouts/authlayouts/ForgotPage'
import ResetPage from '../layouts/authlayouts/ResetPage'
import { toast } from 'react-toastify'
import { removeError } from '../features/errorSlice'
import Contact from '../pages/Contact'
import TasksPage from '../pages/TasksPage'
import MainPage from '../pages/MainPage'
import { setTask } from '../features/taskSlice'
import CreatePage from '../pages/CreatePage'
import ProfilePage from '../pages/ProfilePage'
import EditTaskPage from '../pages/EditTaskPage'
import PublicRoute from '../layouts/authlayouts/PublicRoute'

const AppRoutes = () => {
    let dispatch=useDispatch()
    let {error}=useSelector((state)=>state.error)
    let {user}=useSelector((state)=>state.user)

    useEffect(()=>{
        let fetch=async()=>{
            try {
            let res=await axiosInstance.get('/me', {
              disableGlobalError:true
      })     
      console.log(res);
      
            let userdata=res.data.data
            dispatch(setUser(userdata))
            
        } catch (error) {
            console.log(error);
        }
        finally{
            dispatch(removeLoading())
        }
        }
        fetch()
    },[])
     console.log(user);
     
    useEffect(()=>{
      let fetchtask=async()=>{
        try{
             let alltasks=await axiosInstance.get(`/tasks/all/${user?._id}`, {
               disableGlobalError:true
         })
            dispatch(setTask(alltasks.data.data))
        }catch(error){
            console.log(error);
        }
      }
      fetchtask()
    },[user])
    
    useEffect(()=>{
         if(error){
             toast.error(error)
             dispatch(removeError())
         }
    },[error])
    

    let router=createBrowserRouter([
               {
                path:"/",
                element:<AuthRoute/>,
                children:[
                     {
                 index:true,
                 element:<PublicRoute/>
                },
                {
                   path:'login',
                    element:<Login/>
                },
                {
                    path:'register',
                    element:<Register/>
                },{
                    path:'forget',
                    element:<ForgotPage/>
                },{
                    path:'reset-password/:token',
                    element:<ResetPage/>
                }
                ]
               }
        ,
            {
             path:'/home',
             element:<ProtectedRoute/>,
             children:[
                {
                    element:<MainPage/>,
                    children:[
                        {
                            index:true,
                            element:<Home/>
                        }
                        ,
                        {
                    path:'tasks',
                    element:<TasksPage/>
                },
                {
                    path:'contact',
                    element:<Contact/>
                },{
                    path:'create-task',
                    element:<CreatePage/>
                },{
                    path:'profile',
                    element:<ProfilePage/>
                },{
                    path:'edit-task/:id',
                    element:<EditTaskPage/>
                }
                    ]
                }
             ]
        }
    ])
  return <RouterProvider router={router}/>
}

export default AppRoutes
