const express = require("express");
const contactusRoutes = express.Router();

contactusRoutes.route("/save-contactus").post(insertContactUs);

module.exports = { contactusRoutes };
