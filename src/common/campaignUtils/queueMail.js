const Emailqueue = require("../../../models").EmailQueue;

const queueMail = async (data, campaignID) => {
  try {
    await data.recipient.forEach((element) => {
      Emailqueue.create({
        subject: data.campaignInfo.subject,
        fromName: data.campaignInfo.fromName,
        fromEmail: data.campaignInfo.fromMail,
        recipientName: element.json.name,
        recipientEmail: element.json.email,
        group: element.json.group,
        templateName: data.template.name,
        templateData: data.template.data,
        campaignID: campaignID,
        userID: data.userID,
      });
    });
    return 1;
  } catch (error) {
    return error;
  }
};

module.exports = { queueMail };
