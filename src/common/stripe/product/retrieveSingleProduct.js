const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);

const retrieveSingleProduct = async (productID) => {
  return await stripe_key.products.retrieve(productID);
};

module.exports = { retrieveSingleProduct };
