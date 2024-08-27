const express = require("express");
const { insertContactUs } = require("../src/controllers/ContactUs/ContactUsController");
const contactusRoutes = express.Router();

contactusRoutes.route("/save-contactus").post(insertContactUs);

module.exports = { contactusRoutes };
