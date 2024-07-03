const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const CampaignQueue = require("../../../models").CampaignQueue;

const fetchCampaigns = async (userID) => {
  return await CampaignQueue.findAll({ where: { userID: userID } });
};

const campaignSearch = async (data) => {
  return await CampaignQueue.findAll({
    where: {
      campaignName: {
        [Op.like]: `%${data.name}%`,
      },
    },
  });
};

const campaignSearchPagination = async (data) => {
  return await CampaignQueue.findAll({
    where: {
      campaignName: {
        [Op.like]: `%${data.name}%`,
      },
    },
    order: [["id", "DESC"]],
    limit: data.per_page,
    offset: offset,
  });
};
module.exports = { fetchCampaigns, campaignSearch, campaignSearchPagination };
