const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);
const Subscribe = require("../../../../models").Subscribe;

const update = async (priceID, subscriptionID, userID) => {
  const subscription = await stripe_key.subscriptions.update({
    items: [
      {
        id: subscriptionID,
        price: priceID,
      },
    ],
  });
  await Subscribe.update(
    {
      price: priceID,
    },
    {
      where: { userID: userID },
    }
  );
  return subscription;
};

module.exports = { update };
