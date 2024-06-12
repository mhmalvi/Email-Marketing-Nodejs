const Emailqueue = require("../../../models").EmailQueue;
const ejs = require("ejs");
const path = require("path");
const { convert } = require("html-to-text");
const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");

const AppPassword = require("../../../models").AppPassword;
const { fetchQueuedMails } = require("./queueMail");
const {
  updateDeliveryStatus,
  updateBounceStatus,
} = require("./updateQueueMail");
const EmailValidator = require("email-deep-validator");
const { log } = require("console");
const sendMail = async (req, res) => {
  const mails = await fetchQueuedMails(); /////////////  get queued recipients from db ///////////
  // console.log(mails);
  mails.forEach(async (mail) => {
    console.log("db_time", mail.schedule);
    console.log("curr time", new Date());
    if (mail.schedule <= new Date()) {
      console.log("true");
      const sender = await AppPassword.findOne({
        where: { email: mail.fromEmail },
      }); ////////////  get app password of the sender from db //////////////////
      const email_str = "{email}";
      const name_str = "{name}";
      const group_str = "{group}";
      var template = convert(mail.templateData); ////////// convert from html to plain text /////////
      
      if (template.includes(email_str)) {
        var template = template.replace(email_str, mail.recipientEmail);
      } else if (mail.subject.includes(name_str)) {
        var template = template.replace(name_str, mail.recipientName);
      } else if (mail.subject.includes(group_str)) {
        var template = template.replace(group_str, mail.group);
      } ////// replace template {email},{name},{group} with recipients' email,name,group //////

      const id = mail.id;
      const file = path.join(__dirname, "../../ejs/mail.ejs");
      const data = await ejs.renderFile(file, {
        template,
        id,
      });
      let transporterResponse = await transporter(sender);
      const mailOptions = {
        to: mail.recipientEmail, // list of receivers
        subject: subject, // Subject line
        // text: data, // email body
        html: data,
        // text: `Your OTP is`,
        // Specify the return path address
      };
      const emailValidator = new EmailValidator();
      const { wellFormed, validDomain, validMailbox } =
        await emailValidator.verify(mail.recipientEmail);

      console.log(wellFormed);
      console.log(validDomain);
      console.log(validMailbox);
      if (!validDomain || !wellFormed) {
        await updateBounceStatus(mail.id);
      } else {
        await updateDeliveryStatus(mail.id);
        await transporterResponse.sendMail(mailOptions, async (err, info) => {
          if (err) {
            console.log(err);
            return "Error while sending email" + err;
          } else {
            console.log(info.accepted[0]);

            console.log("Email sent", info.accepted);
            return "Email sent";
          }
          // });
        });
      }
    } else {
      console.log("false");
    }
    //  ////////////////////////////////////////////////////////////////
    // }
    // );
    //
  });
};
module.exports = { sendMail };
