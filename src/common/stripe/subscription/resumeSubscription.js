const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);

const resumeSubscription = async (subscriptionID) => {
  return await stripe_key.subscriptions.resume(subscriptionID, {
    billing_cycle_anchor: "unchanged",
  });
};
module.exports = { resumeSubscription };