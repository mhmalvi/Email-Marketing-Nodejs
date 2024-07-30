const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);
const test = async (req, res) => {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];
  // const seconds = Math.floor(date.getTime() / 1000);
  const subscription = await stripe_key.subscriptions.retrieve(
    "sub_1PiAhYKvZ2nwhLRd77kPChW9"
  );
  let milliseconds = subscription.current_period_end * 1000;
  let endDate = new Date(milliseconds);
  // const formattedEndDate = endDate.toISOString().split("T")[0];
  res.json(endDate);
};

module.exports = { test };
