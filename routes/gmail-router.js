const express = require("express");
const gmailRouter = express.Router();
const {
  validateNotificationStoreData,
} = require("../src/middleware/notificationStoreValidator");
const {
  // login,
  // logout,
  // callback,
  list,
} = require("../src/controllers/GmailAuthController");

//////////////////// routers  start ////////////////
// gmailRouter.route("/google/login").get(login);
// gmailRouter.route("/google/callback").get(callback);
// gmailRouter.route("/google-logout").get(logout);
gmailRouter.route("/list").get(list);

//////////////////// routers  end ///////////////

module.exports = { gmailRouter };
