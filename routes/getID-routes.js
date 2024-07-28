const express = require("express");
const getIDRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const { getID } = require("../src/controllers/Stripe/GetID/stripeIDController");

getIDRouter.route("/getID").post(isCustomerAuthenticated, getID);

module.exports = { getIDRouter };