const Campaignqueue = require("../../../models").Campaignqueue;
const insertCampaign = (data) => {
  const email_count = data.length;
  return Campaignqueue.create({
    fromMail: data.campaignInfo.fromMail,
    fromName: data.campaignInfo.fromName,
    count: email_count,
    userID: data.userID,
  });
};

module.exports = { insertCampaign };
