const CampaignQueue = require("../../../models").CampaignQueue;

const fetchCampaigns = async (userID) => {
  return await CampaignQueue.findAll({ where: { userID: userID } });
};

module.exports = { fetchCampaigns };
