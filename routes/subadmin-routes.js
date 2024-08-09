const express = require("express");
const {
  createSubAdmin,
} = require("../src/controllers/SubAdmin/subAdminController");
const subadminRouter = express.Router();

subadminRouter.route("/create-subadmin").post(createSubAdmin);

module.exports = subadminRouter;
