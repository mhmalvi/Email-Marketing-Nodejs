const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);

const create = async (req, res) => {
    const customer = await stripe.customers.create({
      name: "Jenny Rosen",
      email: "jennyrosen@example.com",
    });
};

module.exports = { create };
