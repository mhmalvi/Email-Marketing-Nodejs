const Campaignqueue = require("../../../models").CampaignQueue;
const saveCampaign = (data) => {
  const email_count = data.recipient.length;
  console.log(email_count);
  return Campaignqueue.create({
    fromMail: data.campaignInfo.fromMail,
    fromName: data.campaignInfo.fromName,
    campaignName: data.campaignInfo,
    count: email_count,
    userID: data.userID,
  });
};

module.exports = { saveCampaign };
