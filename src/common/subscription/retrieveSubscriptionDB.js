const Stripe = require("stripe");
const stripe_key = Stripe(process.env.STRIPE_KEY);
const Subscribe = require("../../../models").Subscribe;

const retrieveSubscriptionFromDB = async (userID) => {
  return await Subscribe.findOne({
    where: { userID: userID },
  });
};
module.exports = { retrieveSubscriptionFromDB };
