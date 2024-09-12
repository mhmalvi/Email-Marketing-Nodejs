const {
  convert_curly_brace_email_name_and_group_to_recipient_email_and_name_and_group,
} = require("../../../config/utils");
const { findOne } = require("../contactsUtils/findOne");
const { saveEmail } = require("./saveEmail");

const Contact = require("../../../models").Contact;
const Emailqueue = require("../../../models").EmailQueue;
const queueMail = async (data, campaignID) => {
  try {
    await data.recipient.forEach(async (element) => {
      const contact = await findOne(element.id); ////fetch contact from contacts table
      const template = data.template.data;
      const subject =
        await convert_curly_brace_email_name_and_group_to_recipient_email_and_name_and_group(
          data,
          contact
        );

      await Emailqueue.create({
        subject: subject,
        fromName: data.campaignInfo.fromName,
        fromEmail: data.campaignInfo.fromMail,
        recipientName: element.json.name,
        recipientEmail: element.json.email,
        group: element.json.group,
        company: element.json.company,
        schedule: data.schedule,
        templateName: data.template.name,
        templateData: template,
        campaignID: campaignID,
        userID: data.userID,
        contactID: element.id,
        open: 0,
      });
    });
    return 1;
    // }
  } catch (error) {
    return error;
  }
};

const fetchQueuedMails = async () => {
  return await Emailqueue.findAll({
    where: { deliver: 0 },
    order: [["id", "DESC"]],
    limit:10
  });
};

module.exports = { queueMail, fetchQueuedMails };
