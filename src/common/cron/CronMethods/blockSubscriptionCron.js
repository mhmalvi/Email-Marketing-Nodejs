const Stripe = require("stripe");
const {
  retrieveSingleSubscription,
} = require("../../stripe/subscription/retrieveSingleSubscription");
const Subscribe = require("../../../../models").Subscribe;
const stripe_key = Stripe(process.env.STRIPE_KEY);

const blockSubscription = async () => {
  const subscriptions = await Subscribe.findAll({}); //////// fetch all subscriptions from db
  subscriptions.forEach(async (data) => {
    if (data.subscriptionID !== null) {
      const subscription = retrieveSingleSubscription(data.subscriptionID); ////fetch subscription from stripe
      if (subscription.status === "canceled") {
        data.price = "free";
        data.amount = 0;
        data.expDate = null;
        data.subscriptionID = null;
        data.save();
      } /////////// if canceled convert to free version in DB
    }
    // console.log(data);
  });
};

module.exports = { blockSubscription };
