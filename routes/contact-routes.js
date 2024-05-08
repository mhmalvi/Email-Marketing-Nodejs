const express = require("express");
const Contact = require("../models").Contact;
const contactRouter = express.Router();
const {
  insertContact,
} = require("../src/controllers/Contacts/ContactInsertController");
const {
  fetchContact,
} = require("../src/controllers/Contacts/ContactFetchController");

contactRouter.route("/contact-save/:userID").post(insertContact);
contactRouter.route("/contact-fetch").post(fetchContact);

module.exports = { contactRouter };
