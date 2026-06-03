let nodemailer=require('nodemailer')

let transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    family:4,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

let sentMailTo=async (to,subject,html)=>{
     let options={
        from:process.env.EMAIL_USER,
        to,
        subject,
        html
     }
    try{
         return await transporter.sendMail(options)
    } catch(error){console.log(error)}
}

module.exports=sentMailTo;
