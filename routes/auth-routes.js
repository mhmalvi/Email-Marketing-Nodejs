const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
authRouter.get("/home", (req, res) => {
  res.send("Home Page");
});
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
//   fetch("https://api.ipify.org?format=json")
//     .then((response) => response.json())
//     .then((data) => {
//       //   console.log(data.ip);
//       ip = data.ip;
//     })
//     .catch((error) => {
//       console.log("Error:", error);
//     });
//   // console.log(req.user.email);
//   // credentials = JSON.stringify(req.user);
//   const token = "Bearer " + randomAlphaNumeric(60);
//   const user = await GoogleUser.findOne({
//     where: { googleId: req.user.email },
//   });
//   var newUser = "";
//   if (user === null) {
//     newUser = await User.create({
//       userName: req.user.displayName,
//       googleId: req.user.email,
//       role: 3,
//     });
//     console.log(newUser.id);
//     Token.create({
//       email: req.user.email,
//       token: token,
//       user_id: newUser.id,
//       role: newUser.role,
//       ip: ip,
//     });
//   } else {
//     Token.create({
//       email: req.user.email,
//       token: token,
//       user_id: user.id,
//       role: user.role,
//       ip: ip,
//     });
//   }

  res.send(
    "Welcome" +
      JSON.stringify(req.user.displayName) +
      ".Your email is " +
      req.user.email
  );
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

module.exports = { authRouter };
