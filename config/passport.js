require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const keys = require('./keys')
const User = require("../models").User;
const logger = require("../src/common/utils/logger");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
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
      logger.debug("sffgsg");
      return done(null, profile);
    }
  )
);
