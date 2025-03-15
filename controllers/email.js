const nodemailer = require('nodemailer');
const User = require('../schemas/userschema');
const { text } = require('body-parser');

exports.sendWelcomeEmail = ( email,username ) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'ntshmathapati2003@gmail.com',
            pass: 'kpld mvpu pdfh mceo'
        }
    });

    const mailOption = {
        from: 'ntshmathapati2003@gmail.com',
        to: email,
        subject: 'Welcome to Our Platform!',
        text: `Dear ${username}, \n\nCongratulations on signing up! We’re excited to have you onboard.\n\nBest Regards,\nNitish Mathapati`
    };

    transporter.sendMail(mailOption,(err,info)=>{
        if (err) {
            console.error("Error in sending mail",err);
        } else {
            console.log("Email sent successfully. "+info.response);
        }
    });

};

