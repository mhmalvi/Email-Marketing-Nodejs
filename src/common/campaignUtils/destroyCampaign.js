const CampaignQueue = require("../../../models").CampaignQueue;
module.exports.campaignDestroyer = async (data) => {
  return await CampaignQueue.destroy({
    where: {
      campaignName: data.campaignName,
      userID: data.userID,
    },
  });
};
