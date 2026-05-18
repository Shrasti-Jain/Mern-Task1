let express=require('express')
const { registerController, loginController, forgotPasswordController, resetController, updateController } = require('../controllers/auth.controllers')
const authMiddleware = require('../middlewares/auth.middleware')

let router=express.Router()

router.post('/user/register',registerController)
router.post('/user/login',loginController)
router.post('/user/forget-password',forgotPasswordController)
router.get('/user/reset-password/:rawToken',resetController)
router.post('/user/update-password/:token',updateController)


module.exports=router