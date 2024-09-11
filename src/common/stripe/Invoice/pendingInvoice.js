const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(process.env.STRIPE_KEY);

module.exports.pendingInvoice = async (customerID) => {
  return await stripe_key.invoices.list({
    customer: customerID,
    status: open,
  });
};
