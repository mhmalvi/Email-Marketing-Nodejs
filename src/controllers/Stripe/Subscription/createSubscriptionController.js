const User = require("../../../../models").User;
const { fieldsValidation } = require("../../../../config/utils");
const Subscribe = require("../../../../models").Subscribe;
const {
  create,
} = require("../../../common/stripe/subscription/createSubscription");
const {
  resumeSubscription,
} = require("../../../common/stripe/subscription/resumeSubscription");
const {
  retrieveSingleSubscription,
} = require("../../../common/stripe/subscription/retrieveSingleSubscription");
const {
  update,
} = require("../../../common/stripe/subscription/updateSubscription");
const {
  resumeSubscriptionDB,
} = require("../../../common/subscription/resumeSubscriptionDB");

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
      const subscription_item = await retrieveSingleSubscription(
        subscription.subscriptionID
      ); ////////// fetch subscription stripe
      if (subscription_item.status == "canceled") {
        const resumeResponse = await resumeSubscription(subscription_item.id); ////////// resume subscription stripe
        if (resumeResponse.status == "active") {
          await resumeSubscriptionDB(
            resumeResponse.items.data[0].plan.id,
            resumeResponse.current_period_end,
            userID
          ); ////////// resume subscription db
        }
      }
      response = await update(
        priceID,
        userID,
        subscription.subscriptionID,
        subscription_item.items.data[0].id
      ); ////////////////// update subscription
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
