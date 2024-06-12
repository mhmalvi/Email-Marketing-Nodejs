const {
  convert_curly_brace_email_name_and_group_to_recipient_email_and_name_and_group,
} = require("../../../config/utils");
const { saveEmail } = require("./saveEmail");

const Contact = require("../../../models").Contact;
const Emailqueue = require("../../../models").EmailQueue;
const queueMail = async (data, campaignID) => {
  try {
    console.log(data);
    await data.recipient.forEach(async (element) => {
      const template = data.template.data;
      const subject =
        await convert_curly_brace_email_name_and_group_to_recipient_email_and_name_and_group(
          data,
          element
        );
      console.log(subject);
      await Emailqueue.create({
        subject: subject,
        fromName: data.campaignInfo.fromName,
        fromEmail: data.campaignInfo.fromMail,
        recipientName: element.json.name,
        recipientEmail: element.json.email,
        group: element.json.group,
        schedule: data.schedule,
        templateName: data.template.name,
        templateData: template,
        campaignID: campaignID,
        userID: data.userID,
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
  });
};

module.exports = { queueMail, fetchQueuedMails };
