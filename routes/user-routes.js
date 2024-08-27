const express = require("express");
const {
  userFetch,
} = require("../src/controllers/Clients/ClientFetchController");
const userRouter = express.Router();

userRouter.route("/fetch-users").post(userFetch);

module.exports = { userRouter };
