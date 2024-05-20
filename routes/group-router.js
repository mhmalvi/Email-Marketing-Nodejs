const express = require("express");
const groupRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const {
  fetchGroups,
} = require("../src/controllers/Groups/GroupFetchController");

groupRouter.route("/group-fetch").post(isCustomerAuthenticated, fetchGroups);

module.exports = { groupRouter };
