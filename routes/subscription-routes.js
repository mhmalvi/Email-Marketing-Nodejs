const express = require("express");
const {
  createSubscription,
} = require("../src/controllers/Stripe/Subscription/createSubscriptionController");
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const subscriptionRoutes = express.Router();

const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
subscriptionRoutes
  .route("/create-subscription")
  .post(isCustomerAuthenticated,createSubscription);

module.exports = { subscriptionRoutes };
