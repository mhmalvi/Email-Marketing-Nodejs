const Stripe = require("stripe");
const stripe_key = Stripe(process.env.STRIPE_KEY);
const Subscribe = require("../../../models").Subscribe;

const cancelSubscriptionFromDB = async (userID) => {
  return await Subscribe.update(
    {
      price: "free",
      expDate: null,
    },
    {
      where: { userID: userID },
    }
  );
};

module.exports = { cancelSubscriptionFromDB };
