const CampaignQueue = require("../../../models").CampaignQueue;
const EmailQueue = require("../../../models").EmailQueue;
const { fetchCampaigns } = require("../../common/campaignUtils/fetchCampaigns");
const {
  fetchCampaignsPaginated,
} = require("../../common/campaignUtils/fetchCampaignsPagination");
const {
  fetchCampaignWisePaginated,
} = require("../../common/campaignUtils/mailFetchCampaignWisePaginated");

const campaigns = async (req, res) => {
  const { userID, page, per_page } = req.body;
  if (userID) {
    offset = (page - 1) * per_page;
    const allCampaigns = await fetchCampaigns(userID); /////// fetch campaigns //////
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

const campaignWiseMailFetch = async (req, res) => {
  console.log(req.body);
  const { userID, page, per_page, campaignID } = req.body;
  if (userID && page && per_page && campaignID) {
    offset = (page - 1) * per_page;
    /////// 1.fetch all campaigns of the user //////
    const allEmails = await EmailQueue.findAll({
      where: { userID: userID, campaignID: campaignID },
    });
    /////// 2.count total pages //////
    const totalPages = allEmails.length / per_page;
    /////// 3.count total emails //////
    const count = allEmails.length;
    /////// 4.fetch all paginated campaigns of the user //////
    const paginatedEmails = await fetchCampaignWisePaginated(
      userID,
      campaignID,
      per_page
    );

    console.log(paginatedEmails);
    if (paginatedEmails.length > 0) {
      const open = await EmailQueue.findAll({
        where: { open: 1, userID: userID, campaignID: campaignID },
      });

      const subscribed = await EmailQueue.findAll({
        where: {
          subscription_status: 1,
          userID: userID,
          campaignID: campaignID,
        },
      });

      const unSubscribed = await EmailQueue.findAll({
        where: {
          subscription_status: 0,
          userID: userID,
          campaignID: campaignID,
        },
      });

      const delivered = await EmailQueue.findAll({
        where: {
          deliver: 1,
          userID: userID,
          campaignID: campaignID,
        },
      });
      // console.log(open);
      res.status(200).json({
        message: "success",
        status: 200,
        recipients: paginatedEmails,
        total: count,
        totalPages: Math.ceil(totalPages),
        current_page: page,
        open: open.length,
        not_opened: count - open.length,
        subscribed: subscribed.length,
        unSubscribed: unSubscribed.length,
        delivered: delivered.length,
        bounce: count - delivered.length,
      });
    } else {
      res.status(404).json({
        message: "no emails found",
        status: 404,
      });
    }
  }
};

module.exports = { campaigns, campaignWiseMailFetch };
