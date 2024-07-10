const express = require("express");
const campaignPerformanceRouter = express.Router();
const {
  analytics,
} = require("../src/controllers/CampaignPerformance/campaignPerformanceController");

campaignPerformanceRouter.route("/analytics").get(analytics);


module.exports = {campaignPerformanceRouter};