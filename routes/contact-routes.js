const express = require("express");
const Contact = require("../models").Contact;
const contactRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const { query, validationResult } = require("express-validator");
const {
  insertContact,
} = require("../src/controllers/Contacts/ContactInsertController");
const {
  fetchContact,
  contactFetchByGroup,
} = require("../src/controllers/Contacts/ContactFetchController");
const {
  updateContact,
} = require("../src/controllers/Contacts/ContactUpdateController");
const {
  destroyContact,
} = require("../src/controllers/Contacts/ContactDestroyController");

contactRouter.route("/contact-save/:userID").post(insertContact);
contactRouter.route("/contact-fetch").post(fetchContact);
contactRouter.route("/contact-fetch-by-group").post(contactFetchByGroup);
contactRouter.route("/contact-update").post(updateContact);
contactRouter.route("/contact-destroy").post(destroyContact);

module.exports = { contactRouter };
