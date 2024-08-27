const express = require("express");
const {
  insertContactUs,
} = require("../src/controllers/ContactUs/ContactUsController");
const {
  fetchContactUs,
} = require("../src/controllers/ContactUs/ContactUsFetchController");
const {
  isSuperAdminAuthenticated,
} = require("../src/middleware/superadminMiddleware");
const { deleteContactus } = require("../src/controllers/ContactUs/ContactUsDeleteController");
const contactusRoutes = express.Router();

contactusRoutes.route("/save-contactus").post(insertContactUs);
contactusRoutes
  .route("/fetch-contactus")
  .post(isSuperAdminAuthenticated, fetchContactUs);
  contactusRoutes
    .route("/destroy-contactus")
    .post(isSuperAdminAuthenticated, deleteContactus);

module.exports = { contactusRoutes };
