const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const User = require("../models").User;
const Token = require("../models").Token;
const { randomAlphaNumeric } = require("../config/utils");
const { google } = require("googleapis");
const { saveCredentials } = require("../src/controllers/GmailAuthController");
const { saveToken } = require("../src/common/utils");
const { oauth2Client } = require("../config/passport");

authRouter.get("/home", (req, res) => {
  res.send("Home Page");
});
// const {
//   login,
//   logout,
//   callback,
//   list,
// } = require("../src/controllers/GmailAuthController");
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
// Google Auth consent screen route
authRouter.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/gmail.send"],
    prompt: "select_account",
  })
);

// Call back route
authRouter.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/google/failed",
  }),
  function (req, res) {
    res.redirect("/google/success");
  }
);

// failed route if the authentication fails
authRouter.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.send("Failed");
});

// Success route if the authentication is successful
authRouter.get("/success", isLoggedIn, async (req, res) => {
  console.log("You are logged in");
  console.log(req);
  let ip = "";
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data.ip);
      ip = data.ip;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  console.log(req.user);
  // credentials = JSON.stringify(req.user);
  const token = "Bearer " + randomAlphaNumeric(60);
  const user = await User.findOne({
    where: { email: req.user.email },
  });
  var newUser = "";
  const data = {
    email: req.user.email,
    token: token,
    googleId: req.user.id,
    userName: req.user.displayName,
    role: 3,
    photo: req.user.picture,
  };
  console.log(data);
  if (user === null) {
    newUser = await User.create({
      userName: req.user.displayName,
      email: req.user.email,
      googleId: req.user.id,
      role: 3,
      photo: req.user.picture,
    });

    console.log(newUser.id);

    // return req.user.email;
    await saveToken(data);
    res.redirect(
      `https://www.quemailer.com/auth?userName=${req.user.displayName}&email=${req.user.email}&userID=${userName.id}&photo=${req.user.picture}&token=${token}`
    );
  } else {
    // return req.user.email;
    const token = await saveToken(data);
    res.redirect(
      `https://www.quemailer.com/auth?userName=${req.user.displayName}&email=${req.user.email}&userID=${user.id}&photo=${req.user.picture}&token=${token.token}`
    );
  }
  // const userData = {
  //   email: req.user.email,
  //   role: user.role,
  //   token: token,
  // };
  // console.log(userData);
  // res.status(200).json({
  //   message: "Login successful",
  //   status: 200,
  //   user: userData,
  // });
  // res.send(
  //   "Welcome" +
  //     JSON.stringify(req.user.displayName) +
  //     ".Your email is " +
  //     req.user.email
  // );
  // res.redirect("https://www.quemailer.com/home");
  // if (req.user) {
  //   res.status(200).json({
  //     message: "login success",
  //     status: 200,
  //     user: data,
  //   });
  // } else {
  //   res.status(403).json({
  //     message: "login failed",
  //     status: 403,
  //   });
  // }
  // const externalUrl = "https://www.quemailer.com/home";
  // const params = new URLSearchParams({
  //   email: req.user.email,
  //   userName: req.user.displayName,
  //   id: req.user.id,
  //   token: token,
  // });
  // const response = await fetch(externalUrl, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(req.user),
  // });
  // if (req.user) {
  //   res.redirect(`${externalUrl}?${params}`);
  // }

  // request(
  //   {
  //     url: `https://quemailer.com/home?username=${req.user.displayName}&email=${req.user.email}&googleID=${req.user.id}`,
  //     method: "GET",
  //   },
  //   function (err, response) {
  //     if (err) {
  //       console.log("Error", err);
  //     } else {
  //       console.log(response);
  //     }
  //   }
  // );
});

// Route that logs out the authenticated user
authRouter.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session:", err);
    } else {
      req.logout(() => {
        console.log("You are logged out");

        res.redirect("/google/home");
      });
    }
  });
});

authRouter.post("/send-email", async (req, res) => {
  console.log(req.body);
  // if (!isLoggedIn) {
  //   return res.status(401).send("Unauthorized");
  // }
  const { from, to, subject, text } = req.body;
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  console.log('gmail',gmail);
  const message = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    `to: ${to}\n`,
    `from: ${from}`,
    `subject: ${subject}\n\n`,
    text,
  ].join("");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    res.send(`Message sent: ${result.data.id}`);
  } catch (error) {
    console.error("Error sending email", error);
    res.status(500).send("Failed to send email");
  }
});

authRouter.route("/gmail-login").post(saveCredentials);

// authRouter.route("/google-list").get(list);
// authRouter.get("/list", async (req, res) => {
//   const list = await gmail.users.messages.list({
//     userId: "megatanjib@gmail.com",
//     maxResults: 10,
//   });
//   res.send(list);
// });
module.exports = { authRouter };
