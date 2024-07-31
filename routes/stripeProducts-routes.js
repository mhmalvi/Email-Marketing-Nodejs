const express = require("express");
const stripePricesRouter = express.Router();
const {
  retrievePrices,
} = require("../src/controllers/Stripe/Products/retrieveProductsController");

stripePricesRouter.route("/stripe-prices").get(retrievePrices);

module.exports = { stripeProductsRouter };
