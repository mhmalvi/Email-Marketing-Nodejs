const Emailqueue = require("../../../models").EmailQueue;
const { transporter } = require("../../../config/utils");
const { fetchQueuedMails } = require("./queueMail");

const sendMail = async (req, res) => {
  const mails = await fetchQueuedMails();
  console.log(mails);
  mails.forEach(async (mail) => {
    const mailOptions = {
      from: "<tanjib@quadque.tech>",
      to: mail.recipientEmail, // list of receivers
      subject: "OTP verification", // Subject line
      text: `Your OTP is 4567`,
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
