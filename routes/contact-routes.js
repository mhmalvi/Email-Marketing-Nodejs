const express = require("express");
const Contact = require("../models").Contact;
const contactRouter = express.Router();
const { saveContact } = require("../src/controllers/ContactInsertController");

contactRouter.route("/contact-save").post(saveContact);

module.exports = contactRouter;
