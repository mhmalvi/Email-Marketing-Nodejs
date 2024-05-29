require("dotenv").config();
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const { google } = require("googleapis");
const keys = require("./keys");

const CLIENT_ID = keys.google.clientID;
const CLIENT_SECRET = keys.google.clientSecret;
const REDIRECT_URI = keys.google.redirectUri;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new OAuth2Strategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: REDIRECT_URI,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log("Google profile:", profile); // Log profile to debug
      oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      oauth2Client.on("tokens", (tokens) => {
        if (tokens.refresh_token) {
          console.log(`Refresh Token: ${tokens.refresh_token}`);
        }
        console.log(`Access Token: ${tokens.access_token}`);
      });

      return done(null, profile);
    }
  )
);

module.exports = oauth2Client;
