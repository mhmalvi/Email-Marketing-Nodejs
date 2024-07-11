const express = require("express");
const {
  createSubscription,
} = require("../src/controllers/Stripe/Subscription/createSubscriptionController");
const subscriptionRoutes = express.Router();

subscriptionRoutes.route("/create-subscription").post(createSubscription);

module.exports = { subscriptionRoutes };
