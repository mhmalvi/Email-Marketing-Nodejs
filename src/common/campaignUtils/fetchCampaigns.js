const CampaignQueue = require("../../../models").CampaignQueue;

const fetchCampaigns = async (req, res) => {
  await CampaignQueue.fetchAll({});
};

module.exports = { fetchCampaigns };
