const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);

const retrieveSingleSubscription = async (subscriptionID) => {
    return await stripe_key.subscriptions.retrieve(subscriptionID);
};

module.exports = { retrieveSingleSubscription };