const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);
const Subscribe = require("../../../../models").Subscribe;

const update = async (priceID, subscriptionID, itemID) => {
  console.log("subscriptionID", subscriptionID);
  try {
    const subscription = await stripe_key.subscriptions.update(subscriptionID, {
      items: [
        {
          id: itemID,
          price: priceID,
        },
      ],
      
      proration_behavior: "create_prorations",
      billing_cycle_anchor: "now",
    });
    console.log("subscription res", subscription);
    return subscription;
  } catch (error) {
    console.log("error", error);
    return error;
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
};

module.exports = { update };
