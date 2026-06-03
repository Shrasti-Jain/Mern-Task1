let asyncHandler=(controller)=>{
     return (req,res,next)=>{
         Promise.resolve(controller(req,res,next)).catch((error)=>next(error.message));
     }    
}

module.exports=asyncHandler
