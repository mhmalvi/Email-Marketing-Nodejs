const express = require("express");
const Token = require("../../models").Token;
const User = require("../../models").User;

module.exports.isSuperAdminAuthenticated = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  var userID = null;
  if (bearerHeader) {
    if (req.body.userID) {
      userID = req.body.userID;
    } else if (req.body.user_id) {
      userID = req.body.user_id;
    }
    const user_role = await User.findOne({ where: { id: req.body.userID } });
    const isTokenExist = await Token.findOne({
      where: { token: bearerHeader, userId: userID },
    });
    if (isTokenExist && user_role.role === 1) {
      next();
    } else {
      res.status(401).send("You must login");
    }
  } else {
    res.status(401).send("You must login");
  }
};
