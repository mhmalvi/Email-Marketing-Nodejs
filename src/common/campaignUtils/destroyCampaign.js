const CampaignQueue = require("../../../models").CampaignQueue;
const EmailQueue = require("../../../models").EmailQueue;
module.exports.campaignDestroyer = async (userID, campaignID) => {
  const result = await CampaignQueue.destroy({
    where: {
      id: JSON.parse(campaignID),
      userID: JSON.parse(userID),
    },
  });
  if (result > 0) {
    return await EmailQueue.destroy({
      where: {
        campaignID: JSON.parse(campaignID),
        userID: JSON.parse(userID),
      },
    });
  }
};
