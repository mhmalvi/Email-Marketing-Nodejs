const express = require("express");
const stripeProductsRouter = express.Router();
const {
  retrievePrices,
} = require("../src/controllers/Stripe/Products/retrieveProductsController");

stripeProductsRouter.route("/stripe-prices").get(retrievePrices);

module.exports = { stripeProductsRouter };
