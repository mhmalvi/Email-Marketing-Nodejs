const express = require("express");
const {
  fetchSubadminsByCompany,
} = require("../src/controllers/SubAdmin/fetchSubadminsController");
const { subadminLogout } = require("../src/controllers/SubAdmin/logoutSubadminController");
const {
  createSubAdmin,
} = require("../src/controllers/SubAdmin/subAdminController");
const {
  subAdminLoginToCompany,
} = require("../src/controllers/SubAdmin/SubAdminLoginToCompanyController");
const {
  subAdminRemove,
} = require("../src/controllers/SubAdmin/subAdminRemoveController");
const {
  isSubadminAuthenticated,
} = require("../src/middleware/subadminMiddleware");
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const { changePassword } = require("../src/controllers/SubAdmin/SubAdminPasswordController");
const subadminRouter = express.Router();

subadminRouter.route("/create-subadmin").post(createSubAdmin);

subadminRouter
  .route("/subadminToCompany")
  .post(isSubadminAuthenticated, subAdminLoginToCompany);
subadminRouter
  .route("/company-subadmins")
  .post(isCustomerAuthenticated, fetchSubadminsByCompany);

subadminRouter
  .route("/subadmin-remove")
  .post(isCustomerAuthenticated, subAdminRemove);

  subadminRouter
    .route("/subadmin-pass-change")
    .post(isSubadminAuthenticated, changePassword);

subadminRouter
  .route("/subadmin-logout")
  .post(isSubadminAuthenticated, subadminLogout);

module.exports = subadminRouter;
