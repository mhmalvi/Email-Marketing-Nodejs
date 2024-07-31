const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const { fieldsValidation } = require("../../../../config/utils");
const stripe_key = process.env.STRIPE_KEY

const priceByProductID = async (req, res) => {
  const { priceID } = req.body;
  const requiredFields = { priceID };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const price = await stripe_key.prices.retrieve(priceID);
    // console.log(price);
    if (price) {
      res.status(200).json(price);
    } else {
      res.status(200).json({
        message: "not found",
        status: 404,
      });
    }
  }
};

const retrievePrices = async (req, res) => {
  //   console.log(stripe_key);
  const prices = await stripe_key.prices.list({
    product: process.env.PRODUCT_ID,
    active: true,
  });
  //   console.log(products);
  if (prices) {
    res.status(200).json(prices);
  } else {
    res.status(404).json({
      message: "No package exist",
      status: 404,
    });
  }
};

module.exports = { priceByProductID, retrievePrices };
