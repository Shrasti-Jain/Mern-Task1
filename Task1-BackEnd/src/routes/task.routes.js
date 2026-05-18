let express=require('express')
const { createController, getalltaskController, removeTaskController, updateTaskController } = require('../controllers/task.controllers')
const authMiddleware = require('../middlewares/auth.middleware')

let router=express.Router()

router.post("/create",authMiddleware,createController)
router.get('/all/:id',authMiddleware,getalltaskController)
router.get('/delete-task/:id',authMiddleware,removeTaskController)
router.post('/update-task/:id',authMiddleware,updateTaskController)

module.exports=router