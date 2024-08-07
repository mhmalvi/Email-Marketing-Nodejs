const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();

const CampaignQueue = require("../../../models").CampaignQueue;

const campaignCounts = async (userID) => {
  return await CampaignQueue({
    where: { userID: userID},
  });
};
const fetchCampaigns = async (userID) => {
  return await CampaignQueue.findAll({
    where: { userID: userID },
  });
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
        [Op.like]: `${name}%`,
      },
      userID: JSON.parse(userID),
    },
    order: [["id", "DESC"]],
    limit: per_page,
    offset: offset,
  });
};
module.exports = {
  fetchCampaigns,
  campaignSearch,
  campaignSearchPagination,
  campaignCounts,
};
