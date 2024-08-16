const express = require("express");
const getIDRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const { getID } = require("../src/controllers/Stripe/GetID/stripeIDController");
const { userAccess } = require("../src/controllers/UserAccessController");

getIDRouter.route("/getID").post(isCustomerAuthenticated, getID);
getIDRouter.route("/getUser").post( userAccess);

module.exports = { getIDRouter };
