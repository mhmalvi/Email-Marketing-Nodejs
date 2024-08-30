const Stripe = require("stripe");
// const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);

const cardFetch = async (req, res) => {
    
};

module.exports = { cardFetch };
