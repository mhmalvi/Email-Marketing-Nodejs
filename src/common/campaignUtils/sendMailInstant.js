const Emailqueue = require("../../../models").EmailQueue;
const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");
const nodemailer = require("nodemailer");
const AppPassword = require("../../../models").AppPassword;
const { fetchQueuedMails } = require("./queueMail");
const sendMail = async (req, res) => {
  const mails = await fetchQueuedMails();
  console.log(mails);
  mails.forEach(async (mail) => {
    const sender = await AppPassword.findOne({
      where: { email: mail.fromEmail },
    });
    let transporter = await transporter(sender);
    // const customTransporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false, // Use `true` for port 465, `false` for all other ports
    //   auth: {
    //     user: sender.email,
    //     pass: sender.app_password,
    //   },
    // });
    const mailOptions = {
      to: mail.recipientEmail, // list of receivers
      subject: mail.subject, // Subject line
      text: mail.templateData,
      // text: `Your OTP is`,
      // Specify the return path address
    };
    const info = await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return "Error while sending email" + err;
      } else {
        console.log("Email sent", info.accepted);
        return "Email sent";
      }
      // });
    });

    //
  });
};
module.exports = { sendMail };
