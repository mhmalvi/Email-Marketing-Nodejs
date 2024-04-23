const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
    
  new GoogleStrategy(
    {
      clientID:
        "491721270445-154edfaqh36aac6lt07h7ea2a6ic8r9o.apps.googleusercontent.com", // Your Credentials here.
      clientSecret: "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", // Your Credentials here.
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
      function (request, accessToken, refreshToken, profile, done) {
        console.log("sffgsg");
      return done(null, profile);
    }
  )
);
