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
const { randomAlphaNumeric, getIp } = require("./src/common/utils");
require("./config/passport");
const cors = require("cors");
const { pixelTracker } = require("./routes/pixelTracker-routes");
const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
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

// Base route
app.use(bodyParser.json());
app.listen(port, () => console.log("server running on port" + port));
app
  .use("/google", authRouter)
  .use("/api", gmailRouter)
  .use("/api", contactRouter)
  .use("/api", templateRouter)
  .use("/api", groupRouter)
  .use("/api", campaignRouter)
  .use("/api", appPasswordRouter)
  .use("/", pixelTracker);
app.get("/otp", async (req, res) => {
  res.render(process.cwd() + "/src/ejs/otp-mail.ejs");
});
/////////////////////////////////////////////////////////////////////////////////////////

// Welcome{"provider":"google","sub":"105703349436150658184","id":"105703349436150658184","displayName":"tanjib Rubyat","name":{"givenName":"tanjib","familyName":"Rubyat"},"given_name":"tanjib","family_name":"Rubyat","email_verified":true,"verified":true,"language":"en-GB","email":"tanjibrubyat@gmail.com","emails":[{"value":"tanjibrubyat@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","_raw":"{\n \"sub\": \"105703349436150658184\",\n \"name\": \"tanjib Rubyat\",\n \"given_name\": \"tanjib\",\n \"family_name\": \"Rubyat\",\n \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8\\u003ds96-c\",\n \"email\": \"tanjibrubyat@gmail.com\",\n \"email_verified\": true,\n \"locale\": \"en-GB\"\n}","_json":{"sub":"105703349436150658184","name":"tanjib Rubyat","given_name":"tanjib","family_name":"Rubyat","picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","email":"tanjibrubyat@gmail.com","email_verified":true,"locale":"en-GB"}}
