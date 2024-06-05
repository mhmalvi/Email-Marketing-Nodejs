const Emailqueue = require("../../../models").EmailQueue;

const queueMail = async (data, campaignID) => {
  try {
    console.log(data.userID);
    if (data.recipient.group) {
      const results = await Emailqueue.findAll({
        where: { user_id: data.userID, group: data.recipient.group },
      });
      console.log(results);
    } else {
      await data.recipient.list.forEach(async (element) => {
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
      return 1;
    }
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
