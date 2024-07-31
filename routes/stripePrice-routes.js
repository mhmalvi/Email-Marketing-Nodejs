const express = require("express");
const stripePriceRouter = express.Router();
const {
  priceByProductID,
  retrievePrices,
} = require("../src/controllers/Stripe/Price/retrievePriceController");

stripePriceRouter.route("/stripe-price-by-product-id").post(priceByProductID);
stripePriceRouter.route("/stripe-prices").get(retrievePrices);

module.exports = { stripePriceRouter };
