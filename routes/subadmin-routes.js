const express = require("express");
const {
  fetchSubadminsByCompany,
} = require("../src/controllers/SubAdmin/fetchSubadminsController");
const {
  createSubAdmin,
} = require("../src/controllers/SubAdmin/subAdminController");
const {
  subAdminLoginToCompany,
} = require("../src/controllers/SubAdmin/SubAdminLoginToCompanyController");
const {
  isSubadminAuthenticated,
} = require("../src/middleware/subadminMiddleware");
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const subadminRouter = express.Router();

subadminRouter.route("/create-subadmin").post(createSubAdmin);

subadminRouter
  .route("/subadminToCompany")
  .post(isSubadminAuthenticated, subAdminLoginToCompany);
subadminRouter.route("/company-subadmins").post(fetchSubadminsByCompany);

module.exports = subadminRouter;
