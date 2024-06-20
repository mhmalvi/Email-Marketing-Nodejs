const EmailQueue = require("../../../models").EmailQueue;

const fetchCampaignWisePaginated = async (userID, campaignID, per_page) => {
  return await EmailQueue.findAll({
    where: {
      userID: userID,
      campaignID: campaignID,
    },
    order: [["id", "DESC"]],
    limit: per_page,
    offset: offset,
  });
};

module.exports = { fetchCampaignWisePaginated };
