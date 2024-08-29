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
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const path = require("path");
require("./config/passport");
const cors = require("cors");
const { pixelTracker } = require("./routes/pixelTracker-routes");
require("dotenv").config();

const app = express();
const port = 5000;

const {
  campaignSearch,
  campaignSearchPagination,
} = require("./src/common/campaignUtils/fetchCampaigns");

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
const {
  searchContacts,
  searchContactsPagination,
} = require("./src/common/contactsUtils/fetch");

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
// Welcome{"provider":"google","sub":"105703349436150658184","id":"105703349436150658184","displayName":"tanjib Rubyat","name":{"givenName":"tanjib","familyName":"Rubyat"},"given_name":"tanjib","family_name":"Rubyat","email_verified":true,"verified":true,"language":"en-GB","email":"tanjibrubyat@gmail.com","emails":[{"value":"tanjibrubyat@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","_raw":"{\n \"sub\": \"105703349436150658184\",\n \"name\": \"tanjib Rubyat\",\n \"given_name\": \"tanjib\",\n \"family_name\": \"Rubyat\",\n \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8\\u003ds96-c\",\n \"email\": \"tanjibrubyat@gmail.com\",\n \"email_verified\": true,\n \"locale\": \"en-GB\"\n}","_json":{"sub":"105703349436150658184","name":"tanjib Rubyat","given_name":"tanjib","family_name":"Rubyat","picture":"https://lh3.googleusercontent.com/a/ACg8ocJQYSJH17nYxP9tIGKVyRRzPDPmTQopLs7RjfY80g2PqQ3SNC8=s96-c","email":"tanjibrubyat@gmail.com","email_verified":true,"locale":"en-GB"}}

////// socket connection starts ////////
io.on("connection", async (socket) => {
  const users = {};
  console.log("a user connected");
  await socket.on("campaigns", (data) => {
    const { userID, page, per_page, name } = data;
    const offset = (page - 1) * per_page;
    // users[userId] = socket.id;
    console.log("socket id", socket.id);
    const searchCampaign = async (req, res) => {
      console.log(userID);
      const campaigns = await campaignSearch(data);
      const paginated = await campaignSearchPagination(
        userID,
        per_page,
        offset,
        name
      );
      const socketId = socket.id;
      const totalPages = campaigns.length / per_page;
      const count = campaigns.length;
      const paginate = {
        paginatedData: paginated,
        current_page: page,
        count: count,
        totalPages: Math.ceil(totalPages),
      };
      await io.to(socketId).emit("campaigns", paginate);
    };
    searchCampaign();
  }); ///// socket for campaign search in campaign compare page

  // ------------------------------------------------------------------------------------------------

  await socket.on("contacts", async(data) => {
    const { userID, page, per_page, keyword } = data;
    const searchContact = async () => {
      const offset = (page - 1) * per_page;
      const contacts = await searchContacts(data);
      const paginated = await searchContactsPagination(
        userID,
        offset,
        per_page,
        keyword
      );
      const socketId = socket.id;
      const totalPages = contacts.length / per_page;
      const count = contacts.length;
      const paginate = {
        paginatedData: paginated,
        current_page: page,
        count: count,
        totalPages: Math.ceil(totalPages),
      };
      await io.to(socketId).emit("contacts", paginate);
    };
    await searchContact();
  });
});
