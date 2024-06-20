const express = require("express");
const campaignRouter = express.Router();
const {
  campaignQueue,
} = require("../src/controllers/Campaigns/CampaignQueueController");
const {
  campaigns,
} = require("../src/controllers/Campaigns/CampaignFetchController");
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");

campaignRouter.route("/campaign-create").post(campaignQueue);
campaignRouter.route("/campaign-fetch").post(campaigns);

module.exports = { campaignRouter };
