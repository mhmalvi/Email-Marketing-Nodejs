const express = require("express");
const gmailRouter = express.Router();
const {
  validateNotificationStoreData,
} = require("../src/middleware/notificationStoreValidator");
const {
  getUser,
  sendMail,
  getDrafts,
  readMail,
  retrieveUser,
} = require("../src/controllers/GmailApiController");
const {
  logout,
  isUserEmailExists,
  verifyOTP,
} = require("../src/controllers/AuthController");

//////////////////// routers  start ////////////////

gmailRouter.route("/check-if-user-email-exists").post(isUserEmailExists);
gmailRouter.route("/verify-otp").post(verifyOTP);
gmailRouter.route("/logout").post(logout);

//////////////////// routers  end ///////////////

module.exports = { gmailRouter };
