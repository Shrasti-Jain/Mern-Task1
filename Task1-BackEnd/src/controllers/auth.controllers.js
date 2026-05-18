const UserModel = require("../models/user.model");
const sentMailTo = require("../services/mail.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
let jwt=require('jsonwebtoken')
let bcrypt=require('bcrypt')

let registerController=asyncHandler(async (req,res)=>{

    let {fullname,email,password,collegename,course}=req.body;
    
    if(!fullname || !email || !password ){
        throw new ApiError(400,"All fields are required");
    }

     let isExisted=await UserModel.findOne({
        email
     })

     if(isExisted){
        throw new ApiError(409,"User already registered")
     }

     let newUser=await UserModel.create({
        fullname,
        email,
        password,
        collegename,
        course
     })
     
     let token=newUser.generateToken()
  
     res.cookie("token",token,{
        httpOnly:true,
        sameSite:'none',
        secure:true
     })
     
      await sentMailTo(
   email,
  "Registered Successfully",
  `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #4CAF50;">Registration Successful 🎉</h2>
      
      <p>Hello User,</p>
      
      <p>
        Your account has been successfully registered.
      </p>

      <p>
        Welcome to our platform. We're excited to have you with us!
      </p>

      <p style="margin-top:20px;">
        Thanks & Regards,<br/>
        Team
      </p>
    </div>
  `)

  let safeUser = newUser.toObject()
  delete safeUser.password

     return res.status(201).json(new ApiResponse("User registered successfully",safeUser))
})

let loginController=asyncHandler(async(req,res)=>{
   let {email,password}=req.body
   
   if(!email || !password){
     throw new ApiError(400,"All fields are required");
   }
  
    let isExisted=await UserModel.findOne({
        email
     })

     if(!isExisted){
      throw new ApiError(404,"User not found")
     }
     
     let decode=await isExisted.comparePassword(password)

     if(!decode){
       throw new ApiError(401,"Invalid Credentials")
     }

     let token=isExisted.generateToken()

     res.cookie("token",token,{
      httpOnly:true,
      sameSite:'none',
      secure:true
     })
     
     let safeUser = isExisted.toObject()
  delete safeUser.password

     return res.status(200).json(new ApiResponse("User logged in successfully",safeUser))

})

let forgotPasswordController=asyncHandler(async(req,res)=>{
   let {email}=req.body

    if(!email){
      throw new ApiError(404,"Email is required")
    }

    let user=await UserModel.findOne({
      email
    })

    if(!user){
      throw new ApiError(404,"User not found")
    }

    let rawToken=user.generateToken()

    let rawLink=`http://localhost:3000/api/auth/user/reset-password/${rawToken}`
     
   await sentMailTo(
  email,
  "Reset Your Password",
  `
  <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
    
    <div style="max-width:600px; margin:auto; background:white; border-radius:10px; padding:30px;">

      <h1 style="color:#2563eb; text-align:center;">
        Password Reset Request
      </h1>

      <p style="font-size:16px; color:#333;">
        Hello ${user.fullname},
      </p>

      <p style="font-size:15px; color:#555; line-height:1.6;">
        We received a request to reset your password.
        Click the button below to create a new password.
      </p>

      <div style="text-align:center; margin:30px 0;">
        <a 
          href="${rawLink}"
          style="
            background:#2563eb;
            color:white;
            padding:14px 24px;
            text-decoration:none;
            border-radius:6px;
            font-size:16px;
            display:inline-block;
          "
        >
          Reset Password
        </a>
      </div>

      <p style="font-size:14px; color:#777;">
        If you did not request a password reset, you can safely ignore this email.
      </p>

      <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:13px; color:#999; text-align:center;">
        This link may expire after some time for security reasons.
      </p>

      <p style="font-size:14px; color:#444; text-align:center; margin-top:20px;">
        Thanks,<br/>
        Your Team
      </p>

    </div>
  </div>
  `
)

    return res.status(200).json(new ApiResponse("Mail sent successfully"))
})

let resetController=asyncHandler(async (req,res)=>{
      let rawToken=req.params.rawToken
      console.log(rawToken);
      

      if(!rawToken) throw new ApiError(404,"Token not found")

      let decode =jwt.verify(rawToken,process.env.JWT_SECRET_KEY)

      if(!decode) throw new ApiError(401,"Unauthorized user")

      let user=await UserModel.findById(decode.id)

      if(!user) throw new ApiError(404,"User not found")

      return res.redirect(`http://localhost:5173/reset-password/${rawToken}`)
})

let updateController=asyncHandler(async (req,res)=>{
    let token=req.params.token

    let {password,confirmpassword} =req.body

    if(!token) throw new ApiError(404,"Token not found")
    
    let decode=jwt.verify(token,process.env.JWT_SECRET_KEY)

    if(!decode) throw new ApiError(401,"Unauthorized token")

    if(!password || !confirmpassword) throw new ApiError(404,"Password not found")

    if(password !=confirmpassword) throw new ApiError(400,"Both passwords are not matching")

    let hashPass=await bcrypt.hash(password,10) 
    
    let updatedUser=await UserModel.findByIdAndUpdate(decode.id,{
      password:hashPass
    },{
      new:true
    }).select("-password")
    
    return res.status(200).json(new ApiResponse("Password Updated successfully",updatedUser))

})


module.exports={
    registerController,
    loginController,
    forgotPasswordController,
    resetController,
    updateController,
}