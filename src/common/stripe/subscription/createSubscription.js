// const User = require("/models").User;
const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);
const { subscribe } = require("../../../../models").subscribe;

const create = async (stripeCustomerID, priceID, amount, userID) => {
  const stripeResponse = await stripe_key.subscriptions.create({
    customer: stripeCustomerID,
    items: [
      {
        price: priceID,
      },
    ],
  });
  console.log("subscription", stripeResponse);
  const subscription = await subscribe.update({
    subscription: priceID,
    amount: amount,
    interval: 30,
    expDate: stripeResponse.current_period_end,
    userID: userID,
  });
  console.log(subscription);
};
module.exports = { create };
