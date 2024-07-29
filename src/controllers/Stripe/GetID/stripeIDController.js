const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const Subscribe = require("../../../../models").Subscribe;
const User = require("../../../../models").User;
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);
const { fieldsValidation } = require("../../../../config/utils");
const {
  retrieveSingleProduct,
} = require("../../../common/stripe/product/retrieveSingleProduct");
const { retrievePrice } = require("../../../common/stripe/price/retrieveSinglePrice");

const getID = async (req, res) => {
  const { userID } = req.body;
  // console.log("userID", userID);
  const requiredFields = { userID };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const user = await User.findOne({
      where: { id: userID },
    });
    const subscription = await Subscribe.findOne({
      where: { userID: userID },
    });
      const price = await retrievePrice(subscription.price);
      const product = await retrieveSingleProduct(price.product);
    if (subscription) {
      res.status(200).json({
        message: "success",
        status: 200,
        subscriptionID: subscription.subscriptionID,
        priceID: price.id,
        stripeCustomerID: user.stripeCustomerID,
        productID: product.id,
      });
    } else {
      res.status(404).json({
        message: "not found",
        status: 404,
      });
    }
  }
};

module.exports = { getID };
