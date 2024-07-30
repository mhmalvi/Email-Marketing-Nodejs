const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const {
  customerInvoice,
} = require("../../../common/stripe/Invoice/customerInvoices");
const { fieldsValidation } = require("../../../../config/utils");
const Subscribe = require("../../../../models").Subscribe;
const User = require("../../../../models").User;
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);

const customerInvoices = async (req, res) => {
  const { userID, stripeCustomerID, limit } = req.body;
  const requiredFields = { userID, stripeCustomerID, limit };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const invoice = await customerInvoice(stripeCustomerID, status, limit);
    if (invoice) {
      res.status(200).json({
        message: "success",
        status: 200,
        invoice: invoice,
      });
    } else {
      res.status(404).json({
        message: "no invoice found",
        status: 404,
      });
    }
  }
};

module.exports = { customerInvoices };
