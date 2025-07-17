require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const User = require("./models").User;
const Token = require("./models").Token;
const GoogleUser = require("./models").GoogleUser;
const bodyParser = require("body-parser");
const { authRouter } = require("./routes/auth-routes");
const { gmailRouter } = require("./routes/gmail-router");
const { contactRouter } = require("./routes/contact-routes");
const { templateRouter } = require("./routes/template-router");
const { groupRouter } = require("./routes/group-router");
const { campaignRouter } = require("./routes/campaign-routes");
const { appPasswordRouter } = require("./routes/appPassword-routes");
const { cronRoutes } = require("./routes/cron-routes");
const { randomAlphaNumeric, getIp } = require("./src/common/utils");
const path = require('path')
const logger = require("./src/common/utils/logger");

require("./config/passport");
const cors = require("cors");
const { pixelTracker } = require("./routes/pixelTracker-routes");

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required');
}

const app = express();
const port = 5000;

app
  .use(
    cors({
      origin: (origin, callback) => {
        const allowedOrigins = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : [];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  )
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json())
  .listen(port, () => logger.info("server running on port" + port))
//   app.set("views", path.join(__dirname, "./src/ejs/mail.ejs"));
//   app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("mail", { name: "World" });
// });
app
  .use("/google", authRouter)
  .use(
    "/api",
    gmailRouter,
    contactRouter,
    templateRouter,
    groupRouter,
    campaignRouter,
    appPasswordRouter
  )
  .use("/", pixelTracker)
  .use(express.static("public/assets")); /////////// routes //////////

// app.get("/otp", async (req, res) => {
//   res.render(process.cwd() + "/src/ejs/otp-mail.ejs");
// });
/////////////////////////////////////////////////////////////////////////////////////////

// Welcome{"provider":"google","sub":"105703349436150658184","id":"105703349436150658184","displayName":"tanjib Rubyat","name":{"givenName":"tanjib","familyName":"Rubyat"},"given_name":"tanjib","family_name":"Rubyat","email_verified":true,"verified":true,"language":"en-GB","email":"tanjibrubyat@gmail.com","emails":[{"value":"tanjibrubyat@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","_raw":"{\n \"sub\": \"105703349436150658184\",\n \"name\": \"tanjib Rubyat\",\n \"given_name\": \"tanjib\",\n \"family_name\": \"Rubyat\",\n \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8\\u003ds96-c\",\n \"email\": \"tanjibrubyat@gmail.com\",\n \"email_verified\": true,\n \"locale\": \"en-GB\"\n}","_json":{"sub":"105703349436150658184","name":"tanjib Rubyat","given_name":"tanjib","family_name":"Rubyat","picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","email":"tanjibrubyat@gmail.com","email_verified":true,"locale":"en-GB"}}
