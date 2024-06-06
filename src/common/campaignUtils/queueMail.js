const { saveEmail } = require("./saveEmail");

const Contact = require("../../../models").Contact;
const Emailqueue = require("../../../models").EmailQueue;
const queueMail = async (data, campaignID) => {
  try {
    console.log(data.userID);
    await data.recipient.forEach(async (element) => {
      await Emailqueue.create({
        subject: data.campaignInfo.subject,
        fromName: data.campaignInfo.fromName,
        fromEmail: data.campaignInfo.fromMail,
        recipientName: element.json.name,
        recipientEmail: element.json.email,
        group: element.json.group,
        schedule: element.schedule,
        templateName: data.template.name,
        templateData: data.template.data,
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
