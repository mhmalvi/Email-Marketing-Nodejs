const express = require("express");
const profileRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const {
  updateProfile,
} = require("../src/controllers/ProfilePage/UpdateProfileInfoController");

profileRouter.route("/profile-page-fetch").get(updateProfile);

module.exports = { profileRouter };
