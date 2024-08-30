const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);


const retrievePrice = async (priceID) => {
    return await stripe_key.prices.retrieve(priceID);
}

module.exports = { retrievePrice };