const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);
const Subscribe = require("../../../../models").Subscribe;

const update = async (priceID, userID, subscriptionID, itemID) => {
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
      proration_behavior: "none",
      // billing_cycle_anchor: "now",
      days_until_due: 1,
    });
    console.log("subscription res", subscription);
    const subscriptionDB = await Subscribe.update(
      {
        price: subscription.items.data[0].plan.id,
        amount: subscription.items.data[0].plan.amount / 100,
        interval: 30,
        expDate: subscription.current_period_end,
        product_selection_status: 1,
      },
      { where: { userID: userID } }
    );

    return subscription;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

module.exports = { update };
