let nodemailer=require('nodemailer')

let transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER,
        pass:process.env.APP_PASS
    }
})

let sentMailTo=async (to,subject,html)=>{
     let options={
        from:process.env.USER,
        to,
        subject,
        html
     }
     return await transporter.sendMail(options)
}

module.exports=sentMailTo;