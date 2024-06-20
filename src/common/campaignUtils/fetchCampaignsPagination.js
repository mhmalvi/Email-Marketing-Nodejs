const CampaignQueue = require("../../../models").CampaignQueue;

const fetchCampaignsPaginated = async (userID, per_page) => {
  return await CampaignQueue.findAll({
    where: {
      userID: userID,
    },
    order: [["id", "DESC"]],
    limit: per_page,
    offset: offset,
  });
};

module.exports = { fetchCampaignsPaginated };
