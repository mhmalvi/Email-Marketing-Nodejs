const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const User = require("../models").User;
const Token = require("../models").Token;
const { randomAlphaNumeric } = require("../config/utils");
const { google } = require("googleapis");
const { saveCredentials } = require("../src/controllers/GmailAuthController");
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
    where: { email: req.user.email },
  });
  var newUser = "";
  const data = {
    email: req.user.email,
    token: token,
    googleId: req.user.id,
    userName: req.user.displayName,
    role: 3,
    photo: req.user.picture,
  };
  if (user === null) {
    newUser = await User.create({
      userName: req.user.displayName,
      email: req.user.email,
      googleId: req.user.id,
      role: 3,
      photo: req.user.picture,
    });

    console.log(newUser.id);
    // return req.user.email;
    await saveToken(data);
  } else {
    // return req.user.email;
    await saveToken(data);
  }
  // const userData = {
  //   email: req.user.email,
  //   role: user.role,
  //   token: token,
  // };
  // console.log(userData);
  // res.status(200).json({
  //   message: "Login successful",
  //   status: 200,
  //   user: userData,
  // });
  // res.send(
  //   "Welcome" +
  //     JSON.stringify(req.user.displayName) +
  //     ".Your email is " +
  //     req.user.email
  // );
  // res.redirect("https://www.quemailer.com/home");
  // if (req.user) {
  //   res.status(200).json({
  //     message: "login success",
  //     status: 200,
  //     user: data,
  //   });
  // } else {
  //   res.status(403).json({
  //     message: "login failed",
  //     status: 403,
  //   });
  // }
  // const externalUrl = "https://www.quemailer.com/home";
  // const params = new URLSearchParams({
  //   email: req.user.email,
  //   userName: req.user.displayName,
  //   id: req.user.id,
  //   token: token,
  // });
  // const response = await fetch(externalUrl, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(req.user),
  // });
  // if (req.user) {
  //   res.redirect(`${externalUrl}?${params}`);
  // }
  res.redirect(
    `https://www.quemailer.com/auth?userName=${req.user.displayName}&email=${req.user.email}&id=${req.user.id}&photo=${req.user.picture}`
  );
  // request(
  //   {
  //     url: `https://quemailer.com/home?username=${req.user.displayName}&email=${req.user.email}&googleID=${req.user.id}`,
  //     method: "GET",
  //   },
  //   function (err, response) {
  //     if (err) {
  //       console.log("Error", err);
  //     } else {
  //       console.log(response);
  //     }
  //   }
  // );
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

authRouter.route("/gmail-login").post(saveCredentials);

// authRouter.route("/google-list").get(list);
// authRouter.get("/list", async (req, res) => {
//   const list = await gmail.users.messages.list({
//     userId: "megatanjib@gmail.com",
//     maxResults: 10,
//   });
//   res.send(list);
// });
module.exports = { authRouter };
