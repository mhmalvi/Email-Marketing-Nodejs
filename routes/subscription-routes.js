const express = require("express");
const {
  createSubscription,
} = require("../src/controllers/Stripe/Subscription/createSubscriptionController");
const {
  retrieveCurrentPackageInfo,
} = require("../src/controllers/Stripe/Subscription/retrievePackageController");
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const subscriptionRoutes = express.Router();
////////////////////////////////////////////////////////

subscriptionRoutes
  .route("/create-subscription")
  .post(isCustomerAuthenticated, createSubscription);
subscriptionRoutes
  .route("/retrieve-current-package-info")
  .post( retrieveCurrentPackageInfo);

module.exports = { subscriptionRoutes };
