const express = require("express");
const {
  createSubscription,
} = require("../src/controllers/Stripe/Subscription/createSubscriptionController");
const {
  retrieveCurrentPackageInfo,
} = require("../src/controllers/Stripe/Subscription/retrievePackageController");
const {
  test,
} = require("../src/controllers/Stripe/Subscription/testController");
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const { cancelSubscription } = require("../src/controllers/Stripe/Subscription/cancelSubscriptionController");
const subscriptionRoutes = express.Router();
////////////////////////////////////////////////////////
subscriptionRoutes
  .route("/create-subscription")
  .post(isCustomerAuthenticated, createSubscription);
subscriptionRoutes
  .route("/retrieve-current-package-info")
  .post(isCustomerAuthenticated, retrieveCurrentPackageInfo);
subscriptionRoutes.route("/test").get(test);
subscriptionRoutes
  .route("/retrieve-current-package-info")
  .post(isCustomerAuthenticated, retrieveCurrentPackageInfo);
subscriptionRoutes.route("/cancel-subscription").get(cancelSubscription);


module.exports = { subscriptionRoutes };
