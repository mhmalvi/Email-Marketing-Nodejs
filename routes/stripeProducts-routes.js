const express = require("express");
const stripeProductsRouter = express.Router();
const {
  retrieveProducts,
} = require("../src/controllers/Stripe/Products/retrieveProductsController");

stripeProductsRouter.route("/stripe-products").get(retrieveProducts);

module.exports = { stripeProductsRouter };
