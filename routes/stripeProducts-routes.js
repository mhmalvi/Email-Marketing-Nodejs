const express = require("express");
const stripePricesRouter = express.Router();
const {
  retrievePrices,
} = require("../src/controllers/Stripe/Products/retrievePricesController");

stripePricesRouter.route("/stripe-prices").get(retrievePrices);

module.exports = { stripeProductsRouter };
