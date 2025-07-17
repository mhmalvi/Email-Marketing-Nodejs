require("dotenv").config();
const express = require("express");
const axios = require("axios");
const fs = require("fs").promises;
const { createConnection } = require("mysql");
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const connection = require("../../db/db");
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const { isExists } = require("date-fns");
const app = express();
const User = require("../../models").User;
const Token = require("../../models").Token;
const { randomAlphaNumeric } = require("../../config/utils");
const { saveToken } = require("../common/utils");
const passport = require("passport");
const session = require("express-session");
require("../../config/passport");

const list = async (req, res) => {
  // const list = await gmail.users.messages.list({
  //   userId: "megatanjib@gmail.com",
  //   maxResults: 10,
  // });
  // res.send(list);
};

const saveCredentials = async (req, res) => {
  if (req.body.email && req.body.userName && req.body.token && req.body.image) {
    // console.log(req.body);
    const user = await User.findOne({ where: { /* add appropriate conditions here */ } });
    const data = {
      email: req.body.email,
      token: req.body.token,
    };
    var newUser = "";
    if (user === null) {
      console.log("1st");
      newUser = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        role: 3,
        image: req.body.image,
        otp: 0,
      });
      console.log(newUser.id);
      await saveToken(data);
    } else {
      console.log("2nd");
      await saveToken(data);
    }
    res.status(201).json({
      message: "Login success",
      status: 201,
      user: req.body,
    });
  } else {
    res.status(500).json({
      message: "failed",
      status: 500,
    });
  }
};

module.exports = {
  saveCredentials,
  list,
};
