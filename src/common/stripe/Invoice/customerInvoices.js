const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);

const customerInvoice = async (customerID, status, limit) => {
  return await stripe_key.invoices.list({
    customer: customerID,
    status: status,
    limit: limit,
  });
};

module.exports = { customerInvoice };
