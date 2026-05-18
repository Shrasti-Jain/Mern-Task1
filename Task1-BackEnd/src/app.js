require('dotenv').config()
let express=require('express')
const connectDb = require('./config/db')
let authRoutes=require('../src/routes/auth.routes')
const errorMiddleware = require('./middlewares/errorMiddleware')
let taskRoutes=require('../src/routes/task.routes')
let cors=require('cors')
let cookieParser=require('cookie-parser')
const authMiddleware = require('./middlewares/auth.middleware')
const ApiError = require('./utils/apiError')
const ApiResponse = require('./utils/apiResponse')
const userRoutes=require('../src/routes/user.routes')
let app=express()

connectDb()
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/tasks',taskRoutes)
app.use('/user',userRoutes)

app.get('/me',authMiddleware,(req,res)=>{
     return res.status(200).json(new ApiResponse("Logged in user",req.user)) 
})

app.use(errorMiddleware)
module.exports=app