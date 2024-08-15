const express = require("express");
const {
  createSubAdmin,
} = require("../src/controllers/SubAdmin/subAdminController");
const {
  subAdminLoginToCompany,
} = require("../src/controllers/SubAdmin/SubAdminLoginToCompanyController");
const {
  isSubadminAuthenticated,
} = require("../src/middleware/subadminMiddleware");
const subadminRouter = express.Router();

subadminRouter.route("/create-subadmin").post(createSubAdmin);

subadminRouter
  .route("/subadminToCompany")
  .post(isSubadminAuthenticated, subAdminLoginToCompany);

module.exports = subadminRouter;
