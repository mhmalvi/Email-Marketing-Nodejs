const express = require("express");
const appPasswordRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const {
  saveAppPassword,
} = require("../src/controllers/AppPasswords/InsertAppPasswordController");
const {
  fetchAppPasswords,
} = require("../src/controllers/AppPasswords/fetchAppPasswordsController");

appPasswordRouter
  .route("/app-password-save")
  .post(isCustomerAuthenticated, saveAppPassword);
appPasswordRouter
  .route("/app-password-fetch")
  .post(isCustomerAuthenticated,fetchAppPasswords);

module.exports = { appPasswordRouter };
