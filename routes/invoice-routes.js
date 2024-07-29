const express = require("express");
const invoiceRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const {
  customerInvoices,
} = require("../src/controllers/Stripe/Invoice/InvoiceController");

invoiceRouter.route("/customer-invoices").post(customerInvoices);
module.exports = { invoiceRouter };
