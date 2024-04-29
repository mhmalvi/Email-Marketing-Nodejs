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
} = require("../src/controllers/GmailApiController");
const { logout } = require("../src/controllers/AuthController");

//////////////////// routers  start ////////////////
// gmailRouter.route("/google/login").get(login);
// gmailRouter.route("/google/callback").get(callback);
// gmailRouter.route("/google-logout").get(logout);
// gmailRouter.route("/list").get(list);

gmailRouter.route("/mail/user/:email").get(getUser);
gmailRouter.route("/mail/send").get(sendMail);
gmailRouter.route("/mail/drafts/:email").get(getDrafts);
gmailRouter.route("/mail/read/:messageId").get(readMail);
gmailRouter.route("/logout").post(logout);

//////////////////// routers  end ///////////////

module.exports = { gmailRouter };
