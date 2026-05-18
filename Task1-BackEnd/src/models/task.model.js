let mongoose =require('mongoose')

let taskSchema=new mongoose.Schema({
      user_id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"users",
         required:true
      },
      topicname:{
        type:String,
        required:true,
        unique:true
      },
      description:{
        type:String
      },
      duration:{
         type:Number,
         default:0,
         min:0
      },
      difficultylevel:{
        type:String,
        enum:["Low","Medium","Hard"],
        default:"Low"
      }
},{
    timestamps:true
})


let TaskModel=mongoose.model("tasks",taskSchema)

module.exports=TaskModel
