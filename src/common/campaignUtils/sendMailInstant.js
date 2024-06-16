const Emailqueue = require("../../../models").EmailQueue;
const ejs = require("ejs");
const path = require("path");
const cheerio = require("cheerio");
const fs = require("fs");
const mustache = require("mustache");

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
      var template = mail.templateData;

      if (template.includes(email_str)) {
        var template = template.replace(email_str, mail.recipientEmail);
      } else if (template.includes(name_str)) {
        var template = template.replace(name_str, mail.recipientName);
      } else if (template.includes(group_str)) {
        var template = template.replace(group_str, mail.group);
      } ////// replace template {email},{name},{group} with recipients' email,name,group //////

      const id = mail.id;

      // var pixel_url = "https://backend.quemailer.com/open/" + id;
      var pixel = `<img src="https://backend.quemailer.com/open/${id}" />`;
      // console.log(pixel);
      // const file = path.join(__dirname, "../../ejs/mail.ejs");
      // const data = await ejs.renderFile(file, {
      //   id,
      //   template,
      // });
      // Step 2: Read the Mustache template from a file.
      const templatePath = path.join(__dirname, 'src', 'mustache', 'mail.mustache');
      const template = fs.readFileSync(templatePath, "utf8");
      const data = {
        template,
        id,
      };
      // console.log(data);
      // const $ = cheerio.load(template); ////////// load html to cheerio /////////
      // $("body").append(pixel);
      // const styledText = $.text(); ////////// render html to plain text  /////////
      const emailContent = mustache.render(template, data);
      let transporterResponse = await transporter(sender);
      const mailOptions = {
        to: mail.recipientEmail, // list of receivers
        subject: mail.subject, // Subject line
        // text: data, // email body
        html: emailContent,
        // text: styledText,
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
