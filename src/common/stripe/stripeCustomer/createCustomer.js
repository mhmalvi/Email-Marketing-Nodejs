const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);

const create = async (email, name) => {
  return await stripe_key.customers.create({
    name: name,
    email: email,
  });
};

module.exports = { create };
