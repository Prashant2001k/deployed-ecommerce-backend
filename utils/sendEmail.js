const nodeMailer= require("nodemailer");

const sendEmail= async (options) =>{
    const transporter =nodeMailer.createTransport({
        host: "smtp.gmail.com", 
        port:465,
        secure:true,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        },
    });
//    pdbqqcpvzclgrqvo
    const mailOptions={
        from:process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message, 
    }; 
    
    // console.log(mailOptions);
    await transporter.sendMail(mailOptions);
    // console.log("kk");
};
 
module.exports= sendEmail;  