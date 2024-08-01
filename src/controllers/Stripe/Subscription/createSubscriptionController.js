const User = require("../../../../models").User;
const { fieldsValidation } = require("../../../../config/utils");
const Subscribe = require("../../../../models").Subscribe;
const {
  create,
} = require("../../../common/stripe/subscription/createSubscription");
const { retrieveSingleSubscription } = require("../../../common/stripe/subscription/retrieveSingleSubscription");
const {
  update,
} = require("../../../common/stripe/subscription/updateSubscription");

const createSubscription = async (req, res) => {
  const { userID, stripeCustomerID, priceID, amount, paymentSourceID } =
    req.body;
  // console.log("userID", userID);
  const requiredFields = {
    userID,
    stripeCustomerID,
    priceID,
    amount,
    paymentSourceID,
  };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const subscription = await Subscribe.findOne({
      where: { userID: userID },
    });
    var response = "";
    console.log("subscription.subscriptionID", subscription.subscriptionID);
    if (subscription.subscriptionID == null) {
      response = await create(
        stripeCustomerID,
        priceID,
        amount,
        userID,
        paymentSourceID
      ); ////////////////// create new subscription
      if (response) {
        res.status(201).json({
          message: "success",
          status: 201,
          data: response,
        });
      }
    } else {
      const subscription_item = await retrieveSingleSubscription(subscription.subscriptionID);
      console.log('subscription_item',subscription_item);
      response = await update(
        priceID,
        subscription.subscriptionID,
        subscription_item.items.data[0].id
      ); ////////////////// update subscription
      console.log("response result", response);
      if (response) {
        res.status(201).json({
          message: "success",
          status: 201,
          data: response,
        });
      }
    }
    // console.log(response);
  }
};

module.exports = { createSubscription };
