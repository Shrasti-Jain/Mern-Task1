let nodemailer=require('nodemailer')

let transporter=nodemailer.createTransport({
    service:"gmail",
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
     return await transporter.sendMail(options)
}

module.exports=sentMailTo;