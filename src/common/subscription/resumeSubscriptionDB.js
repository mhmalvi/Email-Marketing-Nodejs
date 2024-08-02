const Stripe = require("stripe");
const stripe_key = Stripe(process.env.STRIPE_KEY);
const Subscribe = require("../../../models").Subscribe;

export const resumeSubscriptionDB = async (priceID, expDate, userID) => {
  return await Subscribe.update(
    {
      price: priceID,
      expDate: expDate,
    },
    {
      where: { userID: userID },
    }
  );
};
