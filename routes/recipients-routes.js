const express = require("express");
const {
  allRecipients,
} = require("../src/controllers/Campaigns/AllRecipientsFetchController");
const recipientsRouter = express.Router();

recipientsRouter.route("/get-all-recipients-campaignwise").post();

module.exports = { recipientsRouter };
