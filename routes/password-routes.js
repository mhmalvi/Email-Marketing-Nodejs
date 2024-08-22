const express = require("express");
const {
  forgetPassword,
} = require("../src/controllers/Password/ForgetPasswordController");
const passwordRoutes = express.Router();

passwordRoutes.route("/forget-pass").post(forgetPassword);

module.exports = passwordRoutes;
