const CampaignQueue = require("../../../models").CampaignQueue;

const fetchCampaigns = async (req, res) => {
  await CampaignQueue.findAll({});
};

module.exports = { fetchCampaigns };
