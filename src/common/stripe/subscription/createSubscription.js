// const User = require("/models").User;
const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);
const subscribe = require("../../../../models").Subscribe;

const create = async (
  stripeCustomerID,
  priceID,
  amount,
  userID,
  paymentSourceID
) => {
  const stripeResponse = await stripe_key.subscriptions.create({
    customer: stripeCustomerID,
    items: [
      {
        price: priceID,
      },
    ],
    proration_behavior: "none",
    default_source: paymentSourceID,
    collection_method: "send_invoice",
    // billing_cycle_anchor_config: {
    //   day_of_month: 31,
    // },
    days_until_due: 0,
  });
  // console.log("userID", userID);
  const subscription = await subscribe.update(
    {
      price: priceID,
      subscriptionID: stripeResponse.id,
      amount: JSON.parse(amount),
      interval: 30,
      expDate: stripeResponse.current_period_end,
      product_selection_status: 1,
    },
    { where: { userID: userID } }
  );
  // console.log(subscription);
  return stripeResponse;
};
module.exports = { create };
