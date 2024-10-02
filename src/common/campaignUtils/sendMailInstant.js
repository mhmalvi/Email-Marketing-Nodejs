const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const EmailQueue = require("../../../models").EmailQueue;
const ejs = require("ejs");
const path = require("path");
const cheerio = require("cheerio");
const fs = require("fs");
const handlebars = require("handlebars");
const subscribe = require("../../../models").Subscribe;
const User = require("../../../models").User;

const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");

const AppPassword = require("../../../models").AppPassword;
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
const { findOne } = require("../contactsUtils/findOne");
const { fetchQueuedMails } = require("./queueMail");

const updateTable = async () => {
  const users = await User.findAll({ order: [["id", "DESC"]] });

  users.forEach(async (data) => {
    console.log(data.id);
    await subscribe.create(
      {
        subscription: "free",
        amount: 0,
        interval: 30,
        userID: data.id,
      },
      { where: { userID: { [Op.ne]: data.id } } }
    );
  });
};
const sendMail = async (req, res) => {
  const EMAIL_DELAY = 40000; // 40 seconds delay in milliseconds (40 * 1000)
  const mails = await fetchQueuedMails(); /////////////  get queued recipients from db ///////////
  
  for (const mail of mails) {
    console.log('mail.schedule',mail.schedule);
    console.log('new Date()',new Date());
    if (mail.schedule <= new Date()) {
      try {
        const sender = await AppPassword.findOne({
          where: { email: mail.fromEmail },
        }); ////////////  get app password of the sender from db //////////////////
        
        var template = mail.templateData;
        const contact = await findOne(mail.contactID); //// fetch contact from contacts table

        template = await convert_template_curly_brace_email_name_and_group(
          contact,
          template
        ); ////// replace template {email},{name},{group},{company} with recipients' email,name,group and company //////

        const id = mail.id;
        // Step 2: Read the template from a file.
        const templatePath = path.join(__dirname, "../../views/hbs/mail.hbs");
        const templateSource = fs.readFileSync(templatePath, "utf8");
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

        const { wellFormed, validDomain, validMailbox } = await emailValidator(mail); ////  check email bounce ////
        
        if (!validDomain || !wellFormed) {
          await updateBounceStatus(mail.id);
        } else {
          await updateDeliveryStatus(mail.id);
          await transporterResponse.sendMail(mailOptions, async (err, info) => {
            console.log('hello');
            if (err) {
              console.log(`Error while sending email to ${mail.recipientEmail}:`, err);
              return "Error while sending email" + err;
            } else {
              console.log(`Email sent to: ${info.accepted[0]}`);
            }
          });
        }

        mail.open = 0;
        await mail.save();
        console.log(`Open status for ${mail.recipientEmail}: ${mail.open}`);
        
      } catch (err) {
        console.error(`Error sending email to ${mail.recipientEmail}:`, err);
      }
    } else {
      console.log(`Scheduled time not reached for ${mail.recipientEmail}`);
    }

    // Wait 40 seconds before sending the next email
    console.log(`Waiting for 40 seconds before sending the next email...`);
    await new Promise((resolve) => setTimeout(resolve, EMAIL_DELAY));
  }
};
module.exports = { sendMail, updateTable };
