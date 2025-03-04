let express=require('express');
let transfer=require('./mailer.js')
require('dotenv').config()
let app=express()
app.use(express.json())

app.post('/send-otp',(req,res)=>{
    let email = req.body.email
    let otp=''
    for(i=0;i<4;i++){
        otp+=Math.floor(Math.random()*10)
    }
    let mailoptions={
        from:process.env.USER,
        to:email,
        subject:'OTP From NodeMailer',
        html:`
        <p>Hello Your OTP is <h1 style="color: greenyellow;">${otp}</h1></p>
        `,
        text:'Verify your OTP',
        attachments:[{
            filename:'thankyou.jpeg',
            path:'./thankyou.jpeg',
            contentType:'image/jpeg'
        }]

    }
    transfer.sendMail(mailoptions,(err,info)=>{
        if(err){
            console.log(err)
            res.send('Error')
        }else{
            console.log(info)
            res.send('Mail Sent')
        }
    })
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})