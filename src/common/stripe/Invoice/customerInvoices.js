const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = process.env.STRIPE_KEY;

const customerInvoice = async (customerID, status, limit) => {
  return await stripe_key.invoices.list({
    customer: customerID,
    status: status,
    limit: limit,
  });
};

module.exports = { customerInvoice };
