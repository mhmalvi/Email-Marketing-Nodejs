const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const User = require("../models").User;
const Token = require("../models").Token;
const { randomAlphaNumeric } = require("../src/common/utils");
const { google } = require("googleapis");
authRouter.get("/home", (req, res) => {
  res.send("Home Page");
});
// const {
//   login,
//   logout,
//   callback,
//   list,
// } = require("../src/controllers/GmailAuthController");
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
// Google Auth consent screen route
authRouter.get(
  "/login",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// Call back route
authRouter.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/google/failed",
  }),
  function (req, res) {
    res.redirect("/google/success");
  }
);

// failed route if the authentication fails
authRouter.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.send("Failed");
});

// Success route if the authentication is successful
authRouter.get("/success", isLoggedIn, async (req, res) => {
  console.log("You are logged in");
  let ip = "";
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data.ip);
      ip = data.ip;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  // console.log(req.user.email);
  // credentials = JSON.stringify(req.user);
  const token = "Bearer " + randomAlphaNumeric(60);
  const user = await User.findOne({
    where: { googleId: req.user.id },
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
      role: newUser.role,
      ip: ip,
    });
  } else {
    Token.create({
      email: req.user.email,
      token: token,
      role: user.role,
      ip: ip,
    });
  }
  const userData = {
    email: req.user.email,
    role: user.role,
    token: token,
  };
  console.log(userData);
  res.status(200).json({
    message: "Login successful",
    status: 200,
    user: userData,
  });
  // res.send(
  //   "Welcome" +
  //     JSON.stringify(req.user.displayName) +
  //     ".Your email is " +
  //     req.user.email
  // );
});

// Route that logs out the authenticated user
authRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session:", err);
    } else {
      req.logout(() => {
        console.log("You are logged out");

        res.redirect("/google/home");
      });
    }
  });
});
// authRouter.route("/google-list").get(list);
// authRouter.get("/list", async (req, res) => {
//   const list = await gmail.users.messages.list({
//     userId: "megatanjib@gmail.com",
//     maxResults: 10,
//   });
//   res.send(list);
// });
module.exports = { authRouter };
