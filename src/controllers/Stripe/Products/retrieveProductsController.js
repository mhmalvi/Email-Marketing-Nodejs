const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);

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
