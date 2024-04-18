const express = require("express");
const router = express.Router();
const {
  validateNotificationStoreData,
} = require("../middleware/notificationStoreValidator");

const { mailList, auth } = require("../controllers/GmailController");
const { logout } = require("../controllers/GmailLogoutController");

//////////////////// routers  start ////////////////
router.route("/mail-list").post(mailList);
router.route("/login").get(auth);
router.route("/logout").get(logout);

//////////////////// routers  end ///////////////

module.exports = router;
