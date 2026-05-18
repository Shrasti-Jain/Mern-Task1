let express=require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const {logoutController, updateController, uploadController} =require('../controllers/user.controllers')
const upload = require('../config/multer')

let router=express.Router()

router.get('/logout',authMiddleware,logoutController)
router.post('/update-profile',authMiddleware,updateController)
router.post('/upload-image',authMiddleware,upload.single("image"),uploadController)

module.exports=router