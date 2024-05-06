const express = require("express");
const Token = require("../../models").Token;
const User = require("../../models").User;
const sendmail = require("sendmail")();
const { transporter, generateOTP } = require("../../config/utils");
const { randomAlphaNumeric } = require("../../config/utils");
const { saveToken } = require("../common/utils");
const keys = require("../../config/keys");

const isUserEmailExists = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const otp = generateOTP();
    user.otp = otp;
    // console.log(user);
    await user.save();
    const mailOptions = {
      // from: keys.mail.user,
      to: req.body.email, // list of receivers
      subject: "OTP verification", // Subject line
      text: `Your OTP is ${otp}`,
      // Specify the return path address
    };
    const envelopeOptions = {
      from: "tanjib@quadque.tech", // Envelope sender address
    };
    console.log("Mail Options:", mailOptions);
    await transporter.sendMail(mailOptions, envelopeOptions, (error, info) => {
      if (error) {
        console.error("Error occurred:", error);
      } else {
        console.log("Email sent:", info);
      }
    });
    // await sendmail(
    //   {
    //     from: keys.mail.user,
    //     to: req.body.email,
    //     subject: "Password verification",
    //     html: `Your Password is ${otp}`,
    //   },
    //   function (err, reply) {
    //     console.log(err && err.stack);
    //     console.dir(reply);
    //   }
    // );
    res.status(200).json({
      status: true,
      password: otp,
    });
  } else {
    res.status(404).json({
      status: false,
    });
  }
};

const verifyOTP = async (req, res) => {
  if (req.body.otp && req.body.email && req.body.otp !== 0) {
    const user = await User.findOne({
      where: { email: req.body.email },
      where: { otp: req.body.otp },
    });

    if (user) {
      const token = "Bearer " + randomAlphaNumeric(60);
      const data = {
        email: req.body.email,
        token: token,
        userName: user.userName,
        photo: user.image,
      };

      user.otp = 0;
      await user.save();
      await saveToken(data);
      res.status(200).json({
        message: "OTP found",
        status: 200,
        user: data,
      });
    } else {
      res.status(404).json({
        message: "OTP not found",
        status: 404,
      });
    }
  } else {
    res.status(500).json({
      message: "Failed",
      status: 500,
    });
  }
};

const getUser = async (req, res) => {
  const { email, token } = req.body;
  if (email && token) {
    const ifTokenExists = await Token.findOne({
      where: { token: token },
      where: { email: email },
    });
    if (ifTokenExists) {
      const user = await User.findOne({ where: { email: email } });
      const data = {
        email: email,
        userName: user.userName,
        token: token,
        photo: user.image,
      };
      res.status(200).json({
        message: "success",
        status: 200,
        user: data,
      });
    }
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

module.exports = { logout, isUserEmailExists, verifyOTP, getUser };
