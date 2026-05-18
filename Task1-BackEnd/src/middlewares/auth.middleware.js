const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt=require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {

   try {

      let token = req.cookies.token

      if (!token) throw new ApiError(401, "Token not found")

      let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

      if (!decode) throw new ApiError(401, "Unauthorized user")

      let user = await UserModel.findById(decode.id)

      if (!user) throw new ApiError(404, "User not found")

   let safeUser = user.toObject()
  delete safeUser.password

      req.user =safeUser

      next()

   } catch (error) {
      next(error)
   }
}

module.exports=authMiddleware