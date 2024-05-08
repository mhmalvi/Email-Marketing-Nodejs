const express = require("express");
const Contact = require("../models").Contact;
const contactRouter = express.Router();
const { insertContact } = require("../src/controllers/Contacts/ContactInsertController");

contactRouter.route("/contact-save").post(insertContact);

module.exports = {contactRouter};
