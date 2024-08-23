const express = require("express");
const {
  forgetPassword,
} = require("../src/controllers/Password/ForgetPasswordController");
const {
  resetPass,
} = require("../src/controllers/Password/resetPasswordController");
const passwordRoutes = express.Router();

passwordRoutes.route("/forget-pass").post(forgetPassword);
// passwordRoutes.route("/new-password").post(resetPass);

module.exports = passwordRoutes;
