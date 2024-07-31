const Stripe = require("stripe");
const stripe = require("../../../../config/keys");

const customerInvoice = async (customerID, status, limit, stripe_key) => {
  console.log("common", stripe_key);
  const stripe_keys = stripe_key;
  return await stripe_keys.invoices.list({
    customer: customerID,
    status: status,
    limit: limit,
  });
};

module.exports = { customerInvoice };
