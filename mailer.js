let mailer=require('nodemailer')

require('dotenv').config()

let transfer=mailer.createTransport({
    host:'smtp.gmail.com',
    secure:false,
    port:587,
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})

module.exports =transfer