const express = require("express");
const { test } = require("../src/controllers/Stripe/Subscription/testController");
const testRouter = express.Router();

testRouter.route('/test').post(test)
module.exports = { testRouter };