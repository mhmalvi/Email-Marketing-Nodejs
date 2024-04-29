const express = require("express");
const Token = require("../../models").Token;

const logout = async (req, res) => {
  console.log(req.body.token);
  const token = await Token.findOne({ where: { token: req.body.token } });
  if (token) {
    const result = await token.destroy();
    console.log(result);
  }
};

module.exports = { logout };
