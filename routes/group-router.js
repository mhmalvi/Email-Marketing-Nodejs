const express = require("express");
const groupRouter = express.Router();
const {
  fetchGroups,
} = require("../src/controllers/Groups/GroupFetchController");

groupRouter.route("/group-fetch").post(fetchGroups);

module.exports = { groupRouter };
