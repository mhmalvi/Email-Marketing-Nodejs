const express = require("express");
const groupRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const {
  fetchGroups,
} = require("../src/controllers/Groups/GroupFetchController");
const { groupDestroy } = require("../src/controllers/Groups/GroupDestroyController");

groupRouter.route("/group-fetch").post(isCustomerAuthenticated, fetchGroups);
groupRouter.route("/group-destroy").post(isCustomerAuthenticated, groupDestroy);

module.exports = { groupRouter };
