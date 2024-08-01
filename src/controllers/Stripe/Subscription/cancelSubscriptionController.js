const { fieldsValidation } = require("../../../../config/utils");
const {
  retrieveSubscriptionFromDB,
} = require("../../../common/subscription/retrieveSubscriptionDB");
const cancelSubscription = async (req, res) => {
  // console.log('qq');
  const { userID, subscriptionID } = req.body;
  const requiredFields = {
    userID,
  };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const subscriptionDB = await retrieveSubscriptionFromDB(userID);
    if (subscriptionDB) {
      const result = await stripe.subscriptions.cancel(
        subscriptionDB.subscriptionID
      );
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
