const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);
const Subscribe = require("../../../../models").Subscribe;

const update = async (priceID, subscriptionID, userID) => {
  console.log("subscriptionID", subscriptionID);
  try {
    const subscription = await stripe_key.subscriptions.update(subscriptionID, {
      items: [
        {
          price: priceID,
        },
      ],
    });
  } catch (error) {
    return error.raw
  }

  // console.log("subscription result", subscription);
  // await Subscribe.update(
  //   {
  //     price: priceID,
  //   },
  //   {
  //     where: { userID: userID },
  //   }
  // );
  return subscription;
};

module.exports = { update };
