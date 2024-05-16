const express = require("express");
const Contact = require("../models").Contact;
const contactRouter = express.Router();
const {
  insertContact,
} = require("../src/controllers/Contacts/ContactInsertController");
const {
  fetchContact,
} = require("../src/controllers/Contacts/ContactFetchController");
const {
  updateContact,
} = require("../src/controllers/Contacts/ContactUpdateController");

contactRouter.route("/contact-save/:userID").post(insertContact);
contactRouter.route("/contact-fetch").post(fetchContact);
contactRouter.route("/contact-update").post(updateContact);

module.exports = { contactRouter };
