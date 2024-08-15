const express = require("express");
const Token = require("../../models").Token;

module.exports.isUserAuthenticated = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("You must login");
  }
};

module.exports.isSubadminAuthenticated = async (req, res, next) => {
  console.log(req);
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const isTokenExist = await Token.findOne({
      where: { satok: bearerHeader, said: req.body.said },
    });
    if (isTokenExist) {
      next();
    } else {
      res.status(401).send("You must login");
    }
  } else {
    res.status(401).send("You must login");
  }
};
