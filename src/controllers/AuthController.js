const express = require("express");
const Token = require("../../models").Token;
const User = require("../../models").User;
const { transporter, generateOTP } = require("../../config/utils");

const isUserEmailExists = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const otp = generateOTP();
    user.set({
      otp: otp,
    });
    await user.save();
    console.log(otp);
    await transporter.sendMail({
      to: req.body.email, // list of receivers
      subject: "OTP verification", // Subject line
      text: `Your OTP is ${otp}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    res.status(200).json({
      status: true,
    });
  } else {
    res.status(404).json({
      status: false,
    });
  }
};
const logout = async (req, res) => {
  console.log(req.body.token);
  const token = await Token.findOne({ where: { token: req.body.token } });
  if (token) {
    const result = await token.destroy();
    console.log(result);
    if (result) {
      res.status(201).json({
        message: "Deleted",
        status: 201,
      });
    } else {
      res.status(500).json({
        message: "Failed",
        status: 500,
      });
    }
  } else {
    res.status(404).json({
      message: "Not found",
      status: 404,
    });
  }
};

module.exports = { logout, isUserEmailExists };
