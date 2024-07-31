const express = require("express");
const stripePriceRouter = express.Router();
const {
  priceByProductID,
  retrievePrices,
} = require("../src/controllers/Stripe/Price/retrievePriceController");
const {
  retrievePrices,
} = require("../src/controllers/Stripe/Products/retrieveProductsController");

stripePriceRouter.route("/stripe-price-by-product-id").post(priceByProductID);
stripePriceRouter.route("/stripe-prices").post(retrievePrices);

module.exports = { stripePriceRouter };
