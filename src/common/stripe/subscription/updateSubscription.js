const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);
const Subscribe = require("../../../../models").Subscribe;

const update = async (priceID, subscriptionID, userID) => {
  console.log("subscriptionID", subscriptionID);
  try {
    onsole.log("subscription result", subscription);
    await Subscribe.update(
      {
        price: priceID,
      },
      {
        where: { userID: userID },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }

  // return subscription;
};

module.exports = { update };
