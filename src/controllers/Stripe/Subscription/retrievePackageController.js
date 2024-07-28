const { fieldsValidation } = require("../../../../config/utils");
const {
  retrieveSingleSubscription,
} = require("../../../common/stripe/subscription/retrieveSingleSubscription");
const User = require("../../../../models").User;

const retrieveCurrentPackageInfo = async (req, res) => {
  const { subscriptionID } = req.body;
  // console.log("userID", userID);
  const requiredFields = { subscriptionID };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
  }
  const subscription = await retrieveSingleSubscription(subscriptionID); /////  fetch a subscription
  console.log(subscription.subscriptionID);
};

module.exports = { retrieveCurrentPackageInfo };
