const UserModel = require("../models/user.model")
const sentToImagekit = require("../services/storage.service")
const ApiError = require("../utils/apiError")
const ApiResponse = require("../utils/apiResponse")
const asyncHandler = require("../utils/asyncHandler")

let logoutController=asyncHandler((req,res)=>{

 res.clearCookie("token", {
   httpOnly: true,
   sameSite: "lax"
})
  return res.status(200).json(new ApiResponse("User logout successfully"))
})

let updateController=asyncHandler(async (req,res)=>{
     let data=req.body

     if(!data) throw new ApiError(44,"No data found")

      let updatedUser=await UserModel.findByIdAndUpdate(req.user._id,data,{
        new:true
      }).select("-password");

      return res.status(200).json(new ApiResponse("User Updated successfully",updatedUser))
})

let uploadController=asyncHandler(async (req,res)=>{
     let file=req.file

     if(!file) throw new ApiError(404,"Image is required")
     

     let uploadImage=await sentToImagekit(file.buffer,file.originalname)
     

     let updatedUser=await UserModel.findByIdAndUpdate(req.user._id,{
      imageUrl:uploadImage.url
     },{
      new:true
     }).select("-password")

     return res.status(200).json(new ApiResponse("Profile photo updated",updatedUser))
     
})

module.exports={
    logoutController,
    updateController,
    uploadController
}