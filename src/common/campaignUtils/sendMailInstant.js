const EmailQueue = require("../../../models").EmailQueue;
const ejs = require("ejs");
const path = require("path");
const cheerio = require("cheerio");
const fs = require("fs");
const handlebars = require("handlebars");
const subscribe = require("../../../models").subscribe;
const user = require("../../../models").user;

const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");

const AppPassword = require("../../../models").AppPassword;
const { fetchQueuedMails } = require("./queueMail");
const {
  updateDeliveryStatus,
  updateBounceStatus,
} = require("./updateQueueMail");

const { log } = require("console");
const { fetchOne } = require("../appPassUtils/fetchOne");
const {
  emailValidator,
  convert_template_curly_brace_email_name_and_group,
} = require("../../../config/utils");

const updateTable = async () => {
  const users = await user.findAll();
  console.log(users);
  users.forEach(async (data) => {
    await subscribe.findOrCreate(
      {
        subscription: "free",
        amount: 0,
        interval: 30,
        userID: data.id,
      },
      { where: { userID: data.id } }
    );
  });
};
const sendMail = async (req, res) => {
  const mails = await fetchQueuedMails(); /////////////  get queued recipients from db ///////////
  // console.log(mails);
  mails.forEach(async (mail) => {
    if (mail.schedule <= new Date()) {
      const sender = await AppPassword.findOne({
        where: { email: mail.fromEmail },
      }); ////////////  get app password of the sender from db //////////////////
      var template = mail.templateData;
      template = await convert_template_curly_brace_email_name_and_group(
        mail,
        template
      ); ////// replace template {email},{name},{group} with recipients' email,name,group //////
      var id = mail.id;
      // Step 2: Read the template from a file.
      const templatePath = path.join(__dirname, "../../views/hbs/mail.hbs");
      var templateSource = fs.readFileSync(templatePath, "utf8");
      const finalTemplate = handlebars.compile(templateSource);
      const data = {
        id: id,
        template: template,
      };
      const htmlToSend = finalTemplate(data);

      let transporterResponse = await transporter(sender);
      const mailOptions = {
        from: `${mail.fromName} <${mail.fromEmail}>`,
        to: mail.recipientEmail, // list of receivers
        subject: mail.subject, // Subject line
        html: htmlToSend,
      };

      const { wellFormed, validDomain, validMailbox } = await emailValidator(
        mail
      ); ////  check email bounce ////
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
            console.log(id);
            id = null;
          }
        });
      }
    } else {
      console.log("false");
    }
    //  ////////////////////////////////////////////////////////////////
    mail.open = 0;
    await mail.save();
    console.log("open status", mail.open);
  });
};
module.exports = { sendMail,updateTable };
