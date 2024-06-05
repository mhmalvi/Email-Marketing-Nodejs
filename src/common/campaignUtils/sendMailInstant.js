const Emailqueue = require("../../../models").EmailQueue;
const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");

const AppPassword = require("../../../models").AppPassword;
const { fetchQueuedMails } = require("./queueMail");
const { updateDeliveryStatus } = require("./updateQueueMail");
const sendMail = async (req, res) => {
  const mails = await fetchQueuedMails();
  console.log(mails);
  mails.forEach(async (mail) => {
    const sender = await AppPassword.findOne({
      where: { email: mail.fromEmail },
    });
    let transporterResponse = await transporter(sender);
    const mailOptions = {
      to: mail.recipientEmail, // list of receivers
      subject: mail.subject, // Subject line
      text: mail.templateData,
      // text: `Your OTP is`,
      // Specify the return path address
    };
    const info = await transporterResponse.sendMail(
      mailOptions,
      async (err, info) => {
        if (err) {
          console.log(err);
          return "Error while sending email" + err;
        } else {
          await updateDeliveryStatus(info.accepted);
          console.log("Email sent", info.accepted);
          return "Email sent";
        }
        // });
      }
    );

    //
  });
};
module.exports = { sendMail };
