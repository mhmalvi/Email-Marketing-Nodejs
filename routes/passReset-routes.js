const express = require("express");
const passReset = express.Router();
const Subadmin = require("../models").Subadmin;
const User = require("../models").User;

passReset.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ where: { pass_reset_token: token } });
  const subadmin = await Subadmin.findOne({
    where: { pass_reset_token: token },
  });
  if (user || subadmin) {
    res.send(
      '<form method="post" action="/reset-password"><input type="password" name="password" required><input type="submit" value="Reset Password"></form>'
    );
  }
});

module.exports = passReset;
