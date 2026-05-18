let ImageKit=require('imagekit')

let storageInstance=new ImageKit({
    privateKey:process.env.PRI_KEY,
    publicKey:process.env.PUB_KEY,
    urlEndpoint:process.env.END_POINT_URL
})

let sentToImagekit=async(file,fileName)=>{
    let options={
   file,
   fileName,
   folder:'Task1'
    }
    return await storageInstance.upload(options)
}

module.exports=sentToImagekit