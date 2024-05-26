const express = require("express");
const appPasswordRouter = express.Router();
const {saveAppPassword}=require("../src/controllers/AppPasswords/InsertAppPasswordController")

appPasswordRouter.route("/app-password-save").post(saveAppPassword);

module.exports = {appPasswordRouter};