require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const { authRouter } = require("./routes/auth-routes");
const { gmailRouter } = require("./routes/gmail-router");
const { contactRouter } = require("./routes/contact-routes");
const { templateRouter } = require("./routes/template-router");
const { groupRouter } = require("./routes/group-router");
const { campaignRouter } = require("./routes/campaign-routes");
const { appPasswordRouter } = require("./routes/appPassword-routes");
const { recipientsRouter } = require("./routes/recipients-routes");
const { subscriptionRoutes } = require("./routes/subscription-routes");
const {
  campaignPerformanceRouter,
} = require("./routes/campaignPerformance-routes");
const { cronRoutes } = require("./routes/cron-routes");
const { stripeProductsRouter } = require("./routes/stripeProducts-routes");
const { stripePriceRouter } = require("./routes/stripePrice-routes");
const { randomAlphaNumeric, getIp } = require("./src/common/utils");
require("./config/passport");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 5000;

////////// models import /////////////
const CampaignQueue = require("./models").CampaignQueue;

const User = require("./models").User;
const Token = require("./models").Token;
const GoogleUser = require("./models").GoogleUser;
///////// socket imports /////////////
const socketIo = require("socket.io");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { join } = require("node:path");

const { searchContactSocket } = require("./src/socket/searchContactSocket");
const {
  campaignCompareSearchSocket,
} = require("./src/socket/campaignCompareSearchSocket");
///////// socket imports end/////////////
/////////// routes import /////////////
const { getIDRouter } = require("./routes/getID-routes");
const { invoiceRouter } = require("./routes/invoice-routes");
const { countsRouter } = require("./routes/counts-routes");
const ProductRouter = require("./routes/product-routes");
const { testRouter } = require("./routes/test-routes");
const subadminRouter = require("./routes/subadmin-routes");
const passwordRoutes = require("./routes/password-routes");
const passReset = require("./routes/passReset-routes");
const { contactusRoutes } = require("./routes/contactus-routes");
const { userRouter } = require("./routes/user-routes");
const { pixelTracker } = require("./routes/pixelTracker-routes");
const { searchGroupSocket } = require("./src/socket/searchGroupSocket");
/////////// routes import end /////////////

const server = createServer(app);
// const io = new Server(server);
///////// socket imports /////////////

const io = socketIo(server, {
  cors: {
    origin: " * ",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  },
});
app
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  )
  .use(
    session({
      secret: process.env.secret,
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json());

//   app.set("views", path.join(__dirname, "./src/ejs/mail.ejs"));
//   app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("mail", { layout: "mail" });
// });
app.use(bodyParser.json({ limit: "1000mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app
  .use("/google", authRouter)
  .use(
    "/api",
    gmailRouter,
    contactRouter,
    templateRouter,
    groupRouter,
    campaignRouter,
    appPasswordRouter,
    campaignPerformanceRouter,
    recipientsRouter,
    stripeProductsRouter,
    stripePriceRouter,
    subscriptionRoutes,
    getIDRouter,
    invoiceRouter,
    countsRouter,
    ProductRouter,
    testRouter,
    subadminRouter,
    passwordRoutes,
    contactusRoutes,
    userRouter
  )
  .use("/", pixelTracker, passReset)
  .use(express.static("public/assets")); /////////// routes //////////

// app.get("/otp", async (req, res) => {
//   res.render(process.cwd() + "/src/views/ejs/otp-mail.ejs");
// });
/////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => console.log("server running on port" + port));

////// socket connection starts ////////
io.on("connection", async (socket) => {
  await socket.on("campaigns", async (data) => {
    const searchCampaign = async () => {
      const socketId = socket.id;
      const paginate = await campaignCompareSearchSocket(data); /// search campaigns
      await io.to(socketId).emit("campaigns", paginate);
    };
    await searchCampaign();
  }); ///// socket for campaign search in campaign compare page

  // ------------------------------------------------------------------------------------------------

  await socket.on("contacts", async (data) => {
    const searchContact = async () => {
      const socketId = socket.id;
      const paginate = await searchContactSocket(data); ////search contact
      await io.to(socketId).emit("contacts", paginate);
    };
    await searchContact();
  }); ///// socket for contacts search

  // --------------------------------------------------------------------------------------
  await socket.on("groups", async (data) => {
    const searchGroup = async () => {
      const socketId = socket.id;
      const paginate = await searchGroupSocket(data); ////search contact
      await io.to(socketId).emit("groups", paginate);
    };
    await searchGroup();
  }); ///// socket for groups search
});
