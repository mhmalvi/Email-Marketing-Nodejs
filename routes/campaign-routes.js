const express = require("express");
const campaignRouter = express.Router();
const {
  campaignQueue,
} = require("../src/controllers/Campaigns/CampaignQueueController");

campaignRouter.route("/campaign-create").post(campaignQueue);

module.exports = { campaignRouter };
