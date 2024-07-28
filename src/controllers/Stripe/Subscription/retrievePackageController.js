const { fieldsValidation } = require("../../../../config/utils");
const {
  retrievePrice,
} = require("../../../common/stripe/price/retrieveSinglePrice");
const {
  retrieveSingleProduct,
} = require("../../../common/stripe/product/retrieveSingleProduct");
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
    //   res.json(subscription.items.data[0].plan.id);
    const price = await retrievePrice(subscription.items.data[0].plan.id);
    //   res.json(price);
    const product = await retrieveSingleProduct(price.product);
    if (price && product) {
      res.status(200).json({
        message: "success",
        status: 200,
        price: price,
        product: product,
      });
    } else {
      res.status(404).json({
        message: "No data found",
        status: 404,
      });
    }
  }
};

module.exports = { retrieveCurrentPackageInfo };
