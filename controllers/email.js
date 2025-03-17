const nodemailer = require('nodemailer');
const User = require('../schemas/userschema');
const { text } = require('body-parser');

exports.sendVerificationEmail = ( email,username,token ) => {
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
        subject: 'Email verification',
        // text: `Dear ${username}, \n\nCongratulations on signing up! We’re excited to have you onboard.\n\nBest Regards,\nNitish Mathapati`
        html: `<p>Hello ${username},</p>
               <p>Please verify your email by clicking the link below:</p>
               <a href="http://localhost:2025/verify/${token}">Verify Email</a>`
    };

    transporter.sendMail(mailOption,(err,info)=>{
        if (err) {
            console.error("Error in sending mail",err);
        } else {
            console.log("Verification email sent: "+info.response);
        }
    });

};

exports.sendSuccessEmail = ( email,username ) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'ntshmathapati2003@gmail.com',
            pass: 'kpld mvpu pdfh mceo'
        }
    });

    const mailOption = {
        from: 'ntshmathapati2003@gmail.com',
        to: email,
        subject: 'Congratulations on Verifying Your Email!',
        html: `<p>Dear ${username},</p>
               <p>Congratulations! Your email has been successfully verified. You can now log in to your account.</p>
               <p>Thank you for joining us!</p>`
    };

    transporter.sendMail(mailOption, (err,info)=>{
        if (err) {
            console.error(err);
        } else {
            console.log('Success email sent: ' + info.response);
        }
    });

};

