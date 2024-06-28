const express = require("express");
const Contact = require("../models").Contact;
const contactRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const { query, validationResult } = require("express-validator");
const {
  insertContact,
  insertContactManually,
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

contactRouter
  .route("/contact-save/:userID")
  .post(isCustomerAuthenticated, insertContact);
contactRouter
  .route("/contact-save-manually")
  .post(isCustomerAuthenticated, insertContactManually);
contactRouter
  .route("/contact-fetch")
  .post(isCustomerAuthenticated, fetchContact);
contactRouter
  .route("/contact-fetch-by-group")
  .post(isCustomerAuthenticated, contactFetchByGroup);
contactRouter
  .route("/contact-update")
  .post(isCustomerAuthenticated, updateContact);
contactRouter
  .route("/contact-destroy")
  .post(isCustomerAuthenticated, destroyContact);

module.exports = { contactRouter };
