const express = require("express");
const Token = require("../../models").Token;

module.exports.isUserAuthenticated = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("You must login");
  }
};

module.exports.isCustomerAuthenticated = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  // console.log(bearerHeader);
  const isTokenExist = await Token.findOne({
    where: { token: bearerHeader },
  });
  if (isTokenExist) {
    next();
  } else {
    res.status(401).send("You must login");
  }
};
