const Stripe = require("stripe");
const stripe = require("../../../../config/keys");

const customerInvoice = async (customerID, status, limit, stripe_key) => {
  return await stripe_key.invoices.list({
    customer: customerID,
    status: status,
    limit: limit,
  });
};

module.exports = { customerInvoice };
