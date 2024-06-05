const Emailqueue = require("../../../models").EmailQueue;
const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");

const AppPassword = require("../../../models").AppPassword;
const { fetchQueuedMails } = require("./queueMail");
const { updateDeliveryStatus } = require("./updateQueueMail");
const EmailValidator = require("email-deep-validator");
const sendMail = async (req, res) => {
  const mails = await fetchQueuedMails(); /////////////  get queued recipients from db ///////////
  console.log(mails);
  mails.forEach(async (mail) => {
    const sender = await AppPassword.findOne({
      where: { email: mail.fromEmail },
    }); ////////////  get app password of the sender from db //////////////////
    let transporterResponse = await transporter(sender);
    const mailOptions = {
      to: mail.recipientEmail, // list of receivers
      subject: mail.subject, // Subject line
      text: mail.templateData, // email body
      // text: `Your OTP is`,
      // Specify the return path address
    };
    await transporterResponse.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.log(err);
        return "Error while sending email" + err;
      } else {
        const emailValidator = new EmailValidator();
        const { wellFormed, validDomain, validMailbox } =
          await emailValidator.verify(info.accepted);

        console.log(wellFormed);
        console.log(validDomain);
        console.log(validMailbox);
        await updateDeliveryStatus(info.accepted);
        console.log("Email sent", info.accepted);
        return "Email sent";
      }
      // });
    });

    //
  });
};
module.exports = { sendMail };
