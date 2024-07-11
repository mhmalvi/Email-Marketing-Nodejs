const express = require("express");
const stripePriceRouter = express.Router();
const {
  priceByProductID,
} = require("../src/controllers/Stripe/Price/retrievePriceController");

stripePriceRouter.route("/stripe-price-by-product-id").post(priceByProductID);

module.exports = { stripePriceRouter };
