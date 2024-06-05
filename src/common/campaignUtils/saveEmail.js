const Emailqueue = require("../../../models").EmailQueue;

const saveEmail = async (data, results, campaignID) => {
  try {
    results.forEach(async (element) => {
      await Emailqueue.create({
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
      return 1
  } catch (error) {}
};

module.exports = { saveEmail };
