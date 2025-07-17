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
// const TOKEN_PATH = path.join(process.cwd(), "../../token.json");
// const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const passport = require("passport");
const session = require("express-session");
// const keys = require("../../config/keys");
require("../../config/passport");

// Middleware used in protected routes to check if the user has been authenticated

// function login(req, res, next) {
//   console.log("entry");
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//   })(req, res, next);
// }

// const sessionCreator = () => {
//   session({
//     secret: process.env.secret,
//     resave: false,
//     saveUninitialized: false,
//   });
// };

// const callback = (req, res) => {
//   passport.authenticate("google", {
//     failureRedirect: "/failed",
//   }),
//     function (req, res) {
//       res.redirect("/success");
//     };
// };

// const logout = async (req, res) => {
//   await req.session.destroy((err) => {
//     if (err) {
//       console.log("Error while destroying session:", err);
//     } else {
//       req.logout(() => {
//         console.log("You are logged out");
//         res.redirect("/home");
//       });
//     }
//   });
// };
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
  // login,
  // logout,
  // callback,
  // sessionCreator,
  list,
};
