const express = require("express");
const appPasswordRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const {
  saveAppPassword,
} = require("../src/controllers/AppPasswords/InsertAppPasswordController");

appPasswordRouter
  .route("/app-password-save")
  .post(isCustomerAuthenticated, saveAppPassword);

module.exports = { appPasswordRouter };
