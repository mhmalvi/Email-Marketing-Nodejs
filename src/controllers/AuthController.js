const express = require("express");
const Token = require("../../models").Token;

logout = async (req, res) => {
  const token = await Token.findOne({ where: { token: req.body.token } });
  if (token) {
    const result = await token.destroy();
    console.log(result);
  }
};

module.exports = { logout };
