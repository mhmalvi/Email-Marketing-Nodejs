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
  const token = "Bearer " + randomAlphaNumeric(60);
  const user = await User.findOne({
    where: { email: req.user.email },
  });
  var newUser = "";
  if (user === null) {
    newUser = await User.create({
      userName: req.user.displayName,
      email: req.user.email,
      googleId: req.user.id,
      role: 3,
    });
    console.log(newUser.id);
    Token.create({
      email: req.user.email,
      token: token,
      ip: ip,
    });
  } else {
    Token.create({
      email: req.user.email,
      token: token,
      ip: ip,
    });
  }
};

module.exports = {
  // login,
  // logout,
  // callback,
  // sessionCreator,
  list,
};
