const express = require("express");
const {
  createSubAdmin,
} = require("../src/controllers/SubAdmin/subAdminController");
const {
  subAdminLoginToCompany,
} = require("../src/controllers/SubAdmin/SubAdminLoginToCompanyController");
const subadminRouter = express.Router();

subadminRouter.route("/create-subadmin").post(createSubAdmin);

subadminRouter.route("/subadminToCompany").post(subAdminLoginToCompany);

module.exports = subadminRouter;
