const express = require("express");
const {
  allRecipients,
} = require("../src/controllers/Campaigns/AllRecipientsFetchController");
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const recipientsRouter = express.Router();

recipientsRouter
  .route("/get-all-recipients-campaignwise")
  .post(isCustomerAuthenticated, allRecipients);

module.exports = { recipientsRouter };
