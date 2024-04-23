const express = require("express");
const router = express.Router();
const {
  validateNotificationStoreData,
} = require("../middleware/notificationStoreValidator");
const {
  login,
  logout,
  callback,
} = require("../controllers/GmailAuthController");

//////////////////// routers  start ////////////////
router.route("/google/login").get(login);
router.route("/google/callback").get(callback);
router.route("/google-logout").get(logout);
//////////////////// routers  end ///////////////

module.exports = router;
