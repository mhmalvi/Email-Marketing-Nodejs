const express = require("express");
const passReset = express.Router();
const Subadmin = require("../models").Subadmin;
const User = require("../models").User;
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const bcrypt = require("bcrypt");

passReset.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ where: { pass_reset_token: token } });
  const subadmin = await Subadmin.findOne({
    where: { pass_reset_token: token },
  });
  if (user || subadmin) {
    const templatePath = path.join(
      __dirname,
      "../src/views/hbs/resetPassword.hbs"
    );
    const templateSource = fs.readFileSync(templatePath, "utf8");

    // Compile the template
    const template = handlebars.compile(templateSource);

    // Render the template with data
    const html = template({ token });

    // Send the rendered HTML
    res.send(html);
  } else {
    res.send("Link not valid");
  }
});

passReset.post("/new-password", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ where: { email: email } });
    const subadmin = await Subadmin.findOne({
      where: { email: email },
    });
    if (user.pass_reset_token) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds); /// generate salt
      if (salt) {
        const password = await bcrypt.hash(userPassword, salt); //// bcrypt password
        user.password = password;
        await user.save();
        res.send("Password reset successful");
      }
    } else if (subadmin.pass_reset_token) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds); /// generate salt
      if (salt) {
        const password = await bcrypt.hash(userPassword, salt); //// bcrypt password
        subadmin.password = password;
        await subadmin.save();
        res.send("Password reset successful");
      }
    } else {
      res.send("Password reset successful");
    }
  }
});

module.exports = passReset;
