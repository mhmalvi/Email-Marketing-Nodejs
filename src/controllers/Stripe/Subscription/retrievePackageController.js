const { fieldsValidation } = require("../../../../config/utils");
const {
  retrievePrice,
} = require("../../../common/stripe/price/retrieveSinglePrice");
const {
  retrieveSingleSubscription,
} = require("../../../common/stripe/subscription/retrieveSingleSubscription");
const User = require("../../../../models").User;

const retrieveCurrentPackageInfo = async (req, res) => {
  const { subscriptionID, userID } = req.body;
  const requiredFields = { subscriptionID, userID };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const subscription = await retrieveSingleSubscription(subscriptionID); /////  fetch a subscription
    //   console.log(subscription.subscriptionID);
      res.json(items.data.plan.id);
    // const price = await retrievePrice(subscription.id);
    // res.json(price);
  }
};

module.exports = { retrieveCurrentPackageInfo };
