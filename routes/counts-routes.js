const express = require("express");
const { counts } = require("../src/controllers/Counts/LimitController");
const countsRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");

countsRouter.route("/counts").post(counts);

module.exports = { countsRouter };
