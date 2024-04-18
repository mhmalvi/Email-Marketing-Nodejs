const express = require("express");
const router = express.Router();
const {
  validateNotificationStoreData,
} = require("../middleware/notificationStoreValidator");

const { mailList, auth } = require("../controllers/GmailController");
const {
  notificationView,
} = require("../controllers/notificationViewController");
const { fetchAll } = require("../controllers/NotificationFetchController");

//////////////////// routers  start ////////////////
router.route("/mail-list").post(mailList);
router.route("/login").get(auth);


//////////////////// routers  end ///////////////

module.exports = router;
