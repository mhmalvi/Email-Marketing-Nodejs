require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const keys = require('./keys')

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID, // Your Credentials here.
      clientSecret: keys.google.clientSecret, // Your Credentials here.
      callbackURL: keys.redirectUri,
      // callbackURL: "https://developers.google.com/oauthplayground",
      // callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("sffgsg");
      return done(null, profile);
    }
  )
);
