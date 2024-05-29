require("dotenv").config();
const passport = require("passport");
const  OAuth2Strategy = require("passport-google-oidc");
const { google } = require("googleapis");
const keys = require("./keys");

const CLIENT_ID =
  "491721270445-154edfaqh36aac6lt07h7ea2a6ic8r9o.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://backend.quemailer.com/google/callback";
const REFRESH_TOKEN =
  "1//042xetNeQbxRjCgYIARAAGAQSNwF-L9IrE3guTrAL95QH2EqdYWoS-eBSN16GB-2InXiLBKmvrEYTvaYAk2NilHVlQPf2p1Z8h7I";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new OAuth2Strategy(
    {
      clientID: keys.google.clientID, // Your Credentials here.
      clientSecret: keys.google.clientSecret, // Your Credentials here.
      callbackURL: keys.redirectUi,
      // callbackURL: "https://developers.google.com/oauthplayground",
      // callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    //     function (request, accessToken, refreshToken, profile, done) {
    //       console.log("sffgsg");
    //       return done(null, profile);
    //     }
    //   )
    // );
    function (request, accessToken, refreshToken, profile, done) {
      oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      return done(null, profile);
    }
  )
);
