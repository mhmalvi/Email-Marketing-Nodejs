require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const User = require("./models").User;
const Token = require("./models").Token;
const GoogleUser = require("./models").GoogleUser
const { randomAlphaNumeric, getIp } = require("./src/common/utils");
require("./config/passport");

const app = express();
const port = 5000;

// express session
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware used in protected routes to check if the user has been authenticated
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// Base route
app.get("/home", (req, res) => {
  res.send("Home Page");
});

// Google Auth consent screen route
app.get(
  "/login",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// Call back route
app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);

// failed route if the authentication fails
app.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.send("Failed");
});

// Success route if the authentication is successful
app.get("/success", isLoggedIn, async (req, res) => {
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
  const user = await GoogleUser.findOne({
    where: { googleId: req.user.email },
  });
  var newUser = "";
  if (user === null) {
    newUser = await User.create({
      userName: req.user.displayName,
      googleId: req.user.email,
      role: 3,
    });
    console.log(newUser.id);
    Token.create({
      email: req.user.email,
      token: token,
      user_id: newUser.id,
      role: newUser.role,
      ip: ip,
    });
  } else {
    Token.create({
      email: req.user.email,
      token: token,
      user_id: user.id,
      role: user.role,
      ip: ip,
    });
  }

  res.send(
    "Welcome" +
      JSON.stringify(req.user.displayName) +
      ".Your email is " +
      req.user.email
  );
});

// Route that logs out the authenticated user
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session:", err);
    } else {
      req.logout(() => {
        console.log("You are logged out");
        res.redirect("/home");
      });
    }
  });
});

app.listen(port, "0.0.0.0", () => console.log("server running on port" + port));

/////////////////////////////////////////////////////////////////////////////////////////

// Welcome{"provider":"google","sub":"105703349436150658184","id":"105703349436150658184","displayName":"tanjib Rubyat","name":{"givenName":"tanjib","familyName":"Rubyat"},"given_name":"tanjib","family_name":"Rubyat","email_verified":true,"verified":true,"language":"en-GB","email":"tanjibrubyat@gmail.com","emails":[{"value":"tanjibrubyat@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","_raw":"{\n \"sub\": \"105703349436150658184\",\n \"name\": \"tanjib Rubyat\",\n \"given_name\": \"tanjib\",\n \"family_name\": \"Rubyat\",\n \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8\\u003ds96-c\",\n \"email\": \"tanjibrubyat@gmail.com\",\n \"email_verified\": true,\n \"locale\": \"en-GB\"\n}","_json":{"sub":"105703349436150658184","name":"tanjib Rubyat","given_name":"tanjib","family_name":"Rubyat","picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","email":"tanjibrubyat@gmail.com","email_verified":true,"locale":"en-GB"}}
