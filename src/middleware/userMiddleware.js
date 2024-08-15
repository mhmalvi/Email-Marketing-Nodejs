const express = require("express");
const Token = require("../../models").Token;

// module.exports.isUserAuthenticated = async (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.status(401).send("You must login");
//   }
// };

module.exports.isCustomerAuthenticated = async (req, res, next) => {
  console.log(req);
  const bearerHeader = req.headers["authorization"];
  var userID = null;
  if (bearerHeader) {
    if (req.body.userID) {
      userID = req.body.userID;
    } else if (req.body.user_id) {
      userID = req.body.user_id;
    }
    const isTokenExist = await Token.findOne({
      where: { token: bearerHeader, userId: userID },
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
