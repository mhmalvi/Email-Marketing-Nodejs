const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);

const retrieveProducts = async (req, res) => {
  //   console.log(stripe_key);
  const products = await stripe_key.products.list({
    limit: 5,
  });
  //   console.log(products);
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({
      message: "No package exist",
      status: 404,
    });
  }
};

module.exports = { retrieveProducts };
