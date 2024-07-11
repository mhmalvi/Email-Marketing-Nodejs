const User = require("../../../../models").User;
const { fieldsValidation } = require("../../../../config/utils");
const {
  create,
} = require("../../../common/stripe/subscription/createSubscription");

const createSubscription = async (req, res) => {
  const { userID, stripeCustomerID, priceID, amount } = req.body;
  const requiredFields = { userID, stripeCustomerID, priceID, amount };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const response = await create(stripeCustomerID, priceID);
    const user = await User.update(
      {
        amount: amount,
        subscription: subscription,
      },
      {
        where: { userID: userID },
      }
    );
    console.log(user);
  }
};

module.exports = { createSubscription };
