const transporter = require("../config/smtp");

const sendMail = (from, sendTo, subject, content) =>
   new Promise(async (resolve, reject) => {
      const fromObject = from; // Ex: { name: "YOUR COMPANY NAME", address: "no-reply@youremail.com"}

      const mailOptions = {
         from: fromObject,
         to: `${sendTo}`,
         subject: subject,
         html: content,
      };

      transporter()
         .sendMail(mailOptions)
         .then((info) => {
            console.log("Mail Sent!");
            resolve(info);
         })
         .catch((err) => {
            console.log("Sending email error");
            reject(err);
         });
   });

module.exports = sendMail;
