import nodemailer from "nodemailer"

const emailSendingService=async(useremail,subject,otpOrlink)=>{
   try {
     const transporter = nodemailer.createTransport({
         service:"gmail",
         auth:{
             user:process.env.EMAIL_USER,
             pass:process.env.EMAIL_PASS
         }
 });
    await transporter.sendMail(
   {
     from: process.env.EMAIL_USER,
     to: useremail,
     subject: subject,
     text:otpOrlink,
   })
   } catch (error) {
    return console.error("Something went while sending email!")
   }
}
export {emailSendingService}