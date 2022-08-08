const nodeMailer = require("nodemailer");
// require('dotenv').config({path: 'backend/config/config.env'})

const sendEmail = async (options) => {
  const mailTransporter = nodeMailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,  
    secureConnection: false,                     
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_EMAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    form: process.env.SMPT_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await mailTransporter.sendMail(mailOptions,(err)=>{
    if(err){
      console.log("it has an error",err)
    }
    else{
      console.log("email has send!")
    }
  });
};

module.exports = sendEmail;
