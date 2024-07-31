const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = process.env.STRIPE_KEY;

const customerInvoice = async (customerID, status, limit) => {
  console.log("common", stripe_key);
  return await stripe_key.invoices.list({
    customer: customerID,
    status: status,
    limit: limit,
  });
};

module.exports = { customerInvoice };
