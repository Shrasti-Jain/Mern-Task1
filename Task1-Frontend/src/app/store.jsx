import  {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import errorSlice from '../features/errorSlice'
import loadingReducer from '../features/loadingSlice'
import taskReducer from '../features/taskSlice'

export let store=configureStore({
    reducer:{ 
       user:userReducer,
       error:errorSlice,
       loading:loadingReducer,
       tasks:taskReducer
     }
})

