const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const { fieldsValidation } = require("../../../../config/utils");
const stripe_key = process.env.STRIPE_KEY;
const {
  retrieveSubscriptionFromDB,
} = require("../../../common/subscription/retrieveSubscriptionDB");

const cancelSubscription = async (req, res) => {
  // console.log('qq');
  const { userID } = req.body;
  const requiredFields = {
    userID,
  };
  const missingFields = await fieldsValidation(requiredFields); /////////////////// fetch missing fields
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const subscriptionDB = await retrieveSubscriptionFromDB(userID); /////// retrieve subscription from db
      if (subscriptionDB) {
        console.log(stripe_key);
      const result = await stripe_key.subscriptions.cancel(
        subscriptionDB.subscriptionID,
        { prorate: true }
      ); ///////////// cancel subscription
      if (result) {
        res.status(200).json({
          message: "success",
          status: 200,
          data: result,
        });
      } else {
        res.status(500).json({
          message: "Failed",
          status: 500,
        });
      }
    } else {
      res.status(422).json({
        message: "Subscription not found",
        status: 422,
      });
    }
  }
};

module.exports = { cancelSubscription };
