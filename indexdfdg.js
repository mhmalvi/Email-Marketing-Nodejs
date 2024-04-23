require("dotenv").config();
const express = require("express");
const passport = require("passport");
// const session = require("express-session");
const {sessionCreator} = require("./src/controllers/GmailAuthController");
const router = require("./src/router/router");
const cors = require("cors");
require("./passport");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
// express session
app.use(sessionCreator);

app.use(passport.initialize());
app.use(passport.session());

// Base route
app.get("/home", (req, res) => {
  res.send("Home Page");
});

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get("/success", isLoggedIn, (req, res) => {
  console.log("You are logged in");
  console.log(req.user);
  res.send(
    "Welcome" +
      JSON.stringify(req.user.displayName) +
      ".Your email is " +
      req.user.email
  );
});

app.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.send("Failed");
});

// Google Auth consent screen route

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

// Success route if the authentication is successful

// Route that logs out the authenticated user

app.listen(port, () => console.log("server running on port" + port));

app.use("/api", router);
/////////////////////////////////////////////////////////////////////////////////////////

// Welcome{"provider":"google","sub":"105703349436150658184","id":"105703349436150658184","displayName":"tanjib Rubyat","name":{"givenName":"tanjib","familyName":"Rubyat"},"given_name":"tanjib","family_name":"Rubyat","email_verified":true,"verified":true,"language":"en-GB","email":"tanjibrubyat@gmail.com","emails":[{"value":"tanjibrubyat@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","_raw":"{\n \"sub\": \"105703349436150658184\",\n \"name\": \"tanjib Rubyat\",\n \"given_name\": \"tanjib\",\n \"family_name\": \"Rubyat\",\n \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8\\u003ds96-c\",\n \"email\": \"tanjibrubyat@gmail.com\",\n \"email_verified\": true,\n \"locale\": \"en-GB\"\n}","_json":{"sub":"105703349436150658184","name":"tanjib Rubyat","given_name":"tanjib","family_name":"Rubyat","picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","email":"tanjibrubyat@gmail.com","email_verified":true,"locale":"en-GB"}}
