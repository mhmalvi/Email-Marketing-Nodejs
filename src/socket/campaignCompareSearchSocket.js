const {
  campaignSearch,
  campaignSearchPagination,
} = require("../common/campaignUtils/fetchCampaigns");

const campaignCompareSearchSocket = async (data) => {
  console.log();

  const { userID, page, per_page, name } = data;
  const offset = (page - 1) * per_page;
  const campaigns = await campaignSearch(data);
  const paginated = await campaignSearchPagination(
    userID,
    per_page,
    offset,
    name
  );
  const totalPages = campaigns.length / per_page;
  const count = campaigns.length;
  const paginate = {
    paginatedData: paginated,
    current_page: page,
    total: count,
    totalPages: Math.ceil(totalPages),
  };
  return paginate;
};
module.exports = { campaignCompareSearchSocket };
