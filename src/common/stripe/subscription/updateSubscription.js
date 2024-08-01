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
      collection_method: "send_invoice",
      proration_behavior: "create_prorations",
      days_until_due: 33,
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
