const EmailQueue = require("../../../models").EmailQueue;
const ejs = require("ejs");
const path = require("path");
const cheerio = require("cheerio");
const fs = require("fs");
const handlebars = require("handlebars");

const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");

const AppPassword = require("../../../models").AppPassword;
const { fetchQueuedMails } = require("./queueMail");
const {
  updateDeliveryStatus,
  updateBounceStatus,
} = require("./updateQueueMail");

const logger = require("../utils/logger");
const { fetchOne } = require("../appPassUtils/fetchOne");
const {
  emailValidator,
  convert_template_curly_brace_email_name_and_group,
} = require("../../../config/utils");

const { Worker } = require('bullmq');
const Redis = require('ioredis');
const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Cache the template in memory at startup
const templatePath = path.join(__dirname, "../../views/hbs/mail.hbs");
const templateSource = fs.readFileSync(templatePath, "utf8");
const finalTemplate = handlebars.compile(templateSource);

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
      // Use cached template
      const data = {
        id: id,
        template: template,
      };
      const htmlToSend = finalTemplate(data);

      let transporterResponse = await transporter(sender);
      const mailOptions = {
        to: mail.recipientEmail, // list of receivers
        subject: mail.subject, // Subject line
        html: htmlToSend,
      };

      const { wellFormed, validDomain, validMailbox } = await emailValidator(
        mail
      ); ////  check email bounce ////
      logger.debug(`wellFormed: ${wellFormed}`);
      logger.debug(`validDomain: ${validDomain}`);
      logger.debug(`validMailbox: ${validMailbox}`);
      if (!validDomain || !wellFormed) {
        await updateBounceStatus(mail.id);
      } else {
        await updateDeliveryStatus(mail.id);
        await transporterResponse.sendMail(mailOptions, async (err, info) => {
          if (err) {
            logger.error(err);
            return "Error while sending email" + err;
          } else {
            logger.info(`Email sent to: ${info.accepted[0]}`);
            logger.debug(`Email sent: ${JSON.stringify(info.accepted)}`);
            logger.debug(`Mail ID: ${id}`);
            id = null;
          }
        });
      }
    } else {
      logger.debug("Mail not scheduled yet");
    }
    //  ////////////////////////////////////////////////////////////////
    mail.open = 0;
    await mail.save();
    logger.debug(`open status: ${mail.open}`);
  });
};

// BullMQ Worker to process email jobs
const emailWorker = new Worker('emailQueue', async job => {
  // You can pass job data as needed
  await sendMail();
}, { connection });

module.exports = { sendMail };
