const CampaignQueue = require("../../../models").CampaignQueue;
const { fetchCampaigns } = require("../../common/campaignUtils/fetchCampaigns");
const {
  fetchCampaignsPaginated,
} = require("../../common/campaignUtils/fetchCampaignsPagination");

const campaigns = async (req, res) => {
  console.log("ffdbfgb");
  const { userID, page, per_page } = req.body;
  if (userID) {
    offset = (page - 1) * per_page;
    const allCampaigns = await fetchCampaigns(userID); /////// fetch contacts by group //////
    const totalPages = allCampaigns.length / per_page;
    const count = allCampaigns.length;
    const paginatedCampaigns = await fetchCampaignsPaginated(userID, per_page);
    if (paginatedCampaigns.length > 0) {
      res.status(200).json({
        message: "success",
        status: 200,
        campaigns: paginatedCampaigns,
        total: count,
        totalPages: Math.ceil(totalPages),
        current_page: page,
      });
    } else {
      res.status(404).json({
        message: "no campaigns found",
        status: 404,
      });
    }
  }
};

module.exports = { campaigns };
