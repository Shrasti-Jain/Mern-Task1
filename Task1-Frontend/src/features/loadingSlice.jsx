import { createSlice } from "@reduxjs/toolkit";

let LoadingSlice=createSlice({
    name:"Loading",
    initialState:{
        loading:true
    },
    reducers:{
        setLoading:(state)=>{
            state.loading=true
        },
        removeLoading:(state)=>{
            state.loading=false
        }
    }
})

export let {setLoading,removeLoading}=LoadingSlice.actions

export default LoadingSlice.reducer