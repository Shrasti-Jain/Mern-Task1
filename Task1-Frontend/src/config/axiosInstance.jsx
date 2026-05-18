import axios from 'axios'
import { store } from '../app/store';
import { setError } from '../features/errorSlice';

export let axiosInstance=axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

axiosInstance.interceptors.response.use(
    (res)=>{
       return res;
    },
    (error)=>{
       
      if(!error.config.disableGlobalError){

         store.dispatch(
            setError(
               error?.response?.data?.message ||
               "Something went wrong"
            )
         )

      }
       return Promise.reject(error)
    }
)