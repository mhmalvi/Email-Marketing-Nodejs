const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const User = require("../models").User;
const Token = require("../models").Token;
const { randomAlphaNumeric } = require("../config/utils");
const { google } = require("googleapis");
const { saveToken } = require("../src/common/utils");

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

const isNotLoggedIn = (req, res, next) => {
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
    prompt: "select_account",
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
  const token = "Bearer " + randomAlphaNumeric(60);
  const user = await User.findOne({
    where: { email: req.user.email },
  });
  var newUser = "";
  var data = {
    email: req.user.email,
    token: token,
    googleId: req.user.id,
    userName: req.user.displayName,
    role: 3,
    photo: req.user.picture,
  };
  // console.log(data);
  if (user === null) {
    newUser = await User.create({
      userName: req.user.displayName,
      email: req.user.email,
      googleId: req.user.id,
      role: 3,
      image: req.user.picture,
      first_user: 1,
      subscription: "free",
    });

    console.log(newUser.id);
    data.userID = newUser.id;
    console.log(data);
    // return req.user.email;
    await saveToken(data);
    res.redirect(
      `https://www.quemailer.com/auth?userName=${req.user.displayName}&email=${req.user.email}&userID=${newUser.id}&photo=${req.user.picture}&token=${token}&first_user=1&subscription='free'`
    );
  } else {
    // return req.user.email;
    data.userID = user.id;
    if (user.first_user == 1) {
      user.first_user = 0;
      user.save();
    }
    const token = await saveToken(data);
    res.redirect(
      `https://www.quemailer.com/auth?userName=${req.user.displayName}&email=${req.user.email}&userID=${user.id}&photo=${req.user.picture}&token=${token.token}&first_user=${user.first_user}&subscription=${user.subscription}`
    );
  }
});

// Route that logs out the authenticated user
authRouter.get("/logout", isLoggedIn, (req, res) => {
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

// authRouter.route("/gmail-login").post(saveCredentials);

// authRouter.route("/google-list").get(list);
// authRouter.get("/list", async (req, res) => {
//   const list = await gmail.users.messages.list({
//     userId: "megatanjib@gmail.com",
//     maxResults: 10,
//   });
//   res.send(list);
// });
module.exports = { authRouter };
