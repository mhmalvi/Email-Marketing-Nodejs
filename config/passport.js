require("dotenv").config();
const passport = require("passport");
const OAuth2Strategy  = require("passport-google-oauth2");
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
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: keys.redirectUri,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("Google profile:", profile); // Log profile to debug
      oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
        scope: "https://www.googleapis.com/auth/gmail.send",
        token_type: "Bearer",
      });
      oauth2Client.on("tokens", (tokens) => {
        if (tokens.refresh_token) {
          // Store the refresh_token in your database
          console.log(`Refresh Token: ${tokens.refresh_token}`);
        }
        console.log(`Access Token: ${tokens.access_token}`);
      });
      return done(null, profile);
    }
  )
);
// passport.use(
//   new OAuth2Strategy(
//     {
//       clientID: keys.google.clientID, // Your Credentials here.
//       clientSecret: keys.google.clientSecret, // Your Credentials here.
//       callbackURL: keys.redirectUi,
//       // callbackURL: "https://developers.google.com/oauthplayground",
//       // callbackURL: "http://localhost:5000/google/callback",
//       passReqToCallback: true,
//     },
//     //     function (request, accessToken, refreshToken, profile, done) {
//     //       console.log("sffgsg");
//     //       return done(null, profile);
//     //     }
//     //   )
//     // );
//     function (request, accessToken, refreshToken, profile, done) {
//       oauth2Client.setCredentials({
//         access_token: accessToken,
//         refresh_token: refreshToken,
//       });
//       return done(null, profile);
//     }
//   )
// );
