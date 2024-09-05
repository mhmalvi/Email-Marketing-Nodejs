const express = require("express");
const campaignRouter = express.Router();
const {
  campaignQueue,
} = require("../src/controllers/Campaigns/CampaignQueueController");
const {
  campaigns,
  campaignWiseMailFetch,
} = require("../src/controllers/Campaigns/CampaignFetchController");
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const {
  campaignDestroy,
} = require("../src/controllers/Campaigns/CampaignDestroyController");

campaignRouter
  .route("/campaign-create")
  .post(isCustomerAuthenticated, campaignQueue);
campaignRouter
  .route("/campaign-fetch")
  .post(isCustomerAuthenticated, campaigns);
campaignRouter
  .route("/campaignwise-mail-fetch")
  .post(isCustomerAuthenticated, campaignWiseMailFetch);
campaignRouter
  .route("/campaign-destroy")
  .post(isCustomerAuthenticated, campaignDestroy);

module.exports = { campaignRouter };
