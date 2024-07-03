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
      userID: JSON.parse(data.userID),
    },
  });
};

const campaignSearchPagination = async (userID, per_page, offset, name) => {
  return await CampaignQueue.findAll({
    where: {
      campaignName: {
        [Op.like]: `%${name}%`,
      },
      userID: JSON.parse(userID),
    },
    order: [["id", "DESC"]],
    limit: per_page,
    offset: offset,
  });
};
module.exports = { fetchCampaigns, campaignSearch, campaignSearchPagination };
