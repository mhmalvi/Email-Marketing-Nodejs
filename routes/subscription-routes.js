const express = require("express");
const {
  createSubscription,
  test,
} = require("../src/controllers/Stripe/Subscription/createSubscriptionController");
const {
  retrieveCurrentPackageInfo,
} = require("../src/controllers/Stripe/Subscription/retrievePackageController");
const {
  test,
} = require("../src/controllers/Stripe/Subscription/testController");
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const subscriptionRoutes = express.Router();
////////////////////////////////////////////////////////
subscriptionRoutes
  .route("/create-subscription")
  .post(isCustomerAuthenticated, createSubscription);
subscriptionRoutes
  .route("/retrieve-current-package-info")
  .post(isCustomerAuthenticated, retrieveCurrentPackageInfo);
subscriptionRoutes.route("/test").get(test);

module.exports = { subscriptionRoutes };
