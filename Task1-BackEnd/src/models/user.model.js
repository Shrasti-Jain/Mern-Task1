let mongoose =require('mongoose')
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')

let userSchema=new mongoose.Schema({
       fullname:{
        type:String,
        required:true
       },
       email:{
        type:String,
        required:true,
        unique:true
       },
       password:{
        type:String,
        required:true,
        minlength:6
       },
       collegename:{
        type:String
       },
       course:{
        type:String
       },
       imageUrl:{
        type:String
       }
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
})
  
userSchema.methods.generateToken=function(){
   return jwt.sign(
    {id:this._id}
    ,process.env.JWT_SECRET_KEY,{
    expiresIn:'1h'
   })
} 

userSchema.methods.comparePassword=async function(password){
     let decode= await bcrypt.compare(password,this.password)

     return decode 
}



let UserModel=mongoose.model("users",userSchema)


module.exports=UserModel