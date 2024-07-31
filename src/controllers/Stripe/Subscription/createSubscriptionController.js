const User = require("../../../../models").User;
const { fieldsValidation } = require("../../../../config/utils");
const Subscribe = require("../../../../models").Subscribe;
const {
  create,
} = require("../../../common/stripe/subscription/createSubscription");
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
    } else {
      response = await update(priceID, subscription.subscriptionID, userID); ////////////////// update subscription
    }
    if (response) {
      res.status(201).json(response);
    } else {
      res.status(500).json({
        message: "failed",
        status: 500,
      });
    }
    // console.log(response);
  }
};

module.exports = { createSubscription };
