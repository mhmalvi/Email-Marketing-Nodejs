const CampaignQueue = require("../../../models").CampaignQueue;
const EmailQueue = require("../../../models").EmailQueue;
module.exports.campaignDestroyer = async (userID, campaignID) => {
  const result = await CampaignQueue.destroy({
    where: {
      id: campaignID,
      userID: userID,
    },
  });
  if (result > 0) {
    return await EmailQueue.destroy({
      where: {
        campaignID: campaignID,
        userID: userID,
      },
    });
  }
};
