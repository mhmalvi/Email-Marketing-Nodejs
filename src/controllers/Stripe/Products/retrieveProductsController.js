const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);

const retrievePrices = async (req, res) => {
  //   console.log(stripe_key);
  const prices = await stripe_key.prices.list({
    product: process.env.PRODUCT_ID,
  });
  if (prices) {
    res.status(200).json(prices);
  } else {
    res.status(404).json({
      message: "No package exist",
      status: 404,
    });
  }
};

module.exports = { retrievePrices };
