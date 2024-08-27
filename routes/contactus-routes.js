const express = require("express");
const { insertContactUs } = require("../src/controllers/ContactUs/ContactUsController");
const { fetchContactUs } = require("../src/controllers/ContactUs/ContactUsFetchController");
const contactusRoutes = express.Router();

contactusRoutes.route("/save-contactus").post(insertContactUs);
contactusRoutes.route("/fetch-contactus").post(fetchContactUs);

module.exports = { contactusRoutes };
