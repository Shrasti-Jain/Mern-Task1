const TaskModel = require("../models/task.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let createController=asyncHandler(async(req,res)=>{
     let {topicname,description,duration,difficultylevel}=req.body

     if(!topicname) throw new ApiError("Topic Name is required")

    let isExist=await TaskModel.findOne({topicname})

    if(isExist){
        throw new ApiError("Topic already exist")
    }


    let newTask=await TaskModel.create({
        topicname,
        description,
        duration,
        difficultylevel,
        user_id:req.user._id
    })

    return res.status(201).json(new ApiResponse("Task created Successfully",newTask))
})

let getalltaskController=asyncHandler(async (req,res)=>{
    let id=req.params.id

    if(!id) throw new ApiError(404,"Id not found")

   let alltasks=await TaskModel.find({user_id:id})

   return res.status(200).json(new ApiResponse("All Tasks fetched successfully",alltasks||[]))

})

let removeTaskController=asyncHandler(async(req,res)=>{
    let id=req.params.id
    
    if(!id) throw new ApiError(404,"Id not found")

    await TaskModel.findByIdAndDelete(id)

    return res.status(200).json(new ApiResponse("Task deleted successfully"))
})

let updateTaskController=asyncHandler(async (req,res)=>{ 
       let id=req.params.id
       
       if(!id) throw new ApiError(404,"Id not found")

       let data=req.body

       if(!data) throw new ApiError(404,"Data not found")
       
       let updatedTask=await TaskModel.findByIdAndUpdate(id,data,{
        new:true
       })

       return res.status(200).json(new ApiResponse("Task Updated Successfully",updatedTask))
})

module.exports={
    createController,
    getalltaskController,
    removeTaskController,
    updateTaskController
}