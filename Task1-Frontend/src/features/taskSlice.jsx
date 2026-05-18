import {createSlice} from '@reduxjs/toolkit'

let taskSlice=createSlice({
    name:"tasks",
    initialState:{
       tasks:[]
    },
    reducers:{
        setTask:(state,action)=>{
            state.tasks=action.payload
        },
        addTask:(state,action)=>{
            state.tasks.unshift(action.payload)
        },
        removeTask:(state,action)=>{
            state.tasks=state.tasks.filter((e)=>e._id != action.payload)
        },
        deleteall:(state)=>{
            state.tasks=[]
        },
        updateTask:(state,action)=>{
            state.tasks=state.tasks.map((e)=>{
                if(e._id!=action.payload._id) return e;
                return action.payload
            })
        }
    }
})


export let {setTask,addTask,removeTask,deleteall,updateTask}=taskSlice.actions

export default taskSlice.reducer