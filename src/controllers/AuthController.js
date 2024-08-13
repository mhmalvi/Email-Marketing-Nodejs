const express = require("express");
require("dotenv").config();
const Token = require("../../models").Token;
const Subadmin = require("../../models").Subadmin;
const path = require("path");
const ejs = require("ejs");
const { convert } = require("html-to-text");
const User = require("../../models").User;
const Subscribe = require("../../models").Subscribe;
const sendmail = require("sendmail")();
const {
  transporter,
  generateOTP,
  fieldsValidation,
} = require("../../config/utils");
const { randomAlphaNumeric } = require("../../config/utils");
const { saveToken } = require("../common/utils");
const keys = require("../../config/keys");
const EmailValidator = require("email-deep-validator");
const isUserEmailExists = async (req, res) => {
  const baseUrl = process.env.BASE_URL;
  const user = await User.findOne({ where: { email: req.body.email } });
  const subadmin = await Subadmin.findOne({ where: { email: req.body.email } });
  if (user) {
    const otp = generateOTP();
    user.otp = otp;
    await user.save();
    const file = path.join(__dirname, "../views/ejs/otp-mail.ejs");
    const data = await ejs.renderFile(file, {
      otp,
      baseUrl,
    });
    const mailOptions = {
      from: "<mail@quemailer.com>",
      to: req.body.email, // list of receivers
      subject: "OTP verification", // Subject line
      html: data,
    };
    const info = await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return "Error while sending email" + err;
      } else {
        console.log("Email sent", info);
        return "Email sent";
      }
    });
    res.status(200).json({
      status: true,
    });
  } else if (subadmin) {
    res.status(200).json({
      message: "success",
      status: 1,
    });
  } else {
    res.status(404).json({
      status: false,
    });
  }
};

const passLogin = async (req, res) => {
  const { email, password } = req.body;
  const requiredFields = {
    email,
    password,
  };
  const missingFields = await fieldsValidation(requiredFields); ///// validation
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const subadmin = await Subadmin.findOne({
      where: { email: email, password: password },
    });
    if (subadmin) {
      let company = [];
      try {
        const userPromises = subadmin.userID.map(async (data) => {
          console.log("Fetching data for userID:", data);

          const user = await User.findOne({
            where: {
              id: data,
            },
          });

          console.log("Fetched user:", user);

          return user; // Return the username
        });
        // Wait for all promises to resolve
        const company = await Promise.all(userPromises);

        // Filter out null values if any users were not found
        const filteredCompany = company.filter((name) => name !== null);

        console.log("Company usernames:", filteredCompany);
        res.status(200).json({
          message: "success",
          status: 200,
          company: filteredCompany,
        });
      } catch (error) {
        res.json(error);
      }
    } else {
      res.status(401).json({
        message: "wrong email or password",
        status: 401,
      });
    }
  }
};

const verifyOTP = async (req, res) => {
  console.log(req.body);
  if (
    req.body.otp &&
    req.body.email &&
    req.body.otp !== null &&
    req.body.otp !== 0
  ) {
    const user = await User.findOne({
      where: { email: req.body.email },
      where: { otp: req.body.otp },
    });
    const subscription = await Subscribe.findOne({
      where: { userID: user.id },
    });
    console.log(user);
    if (user) {
      const token = "Bearer " + randomAlphaNumeric(60);
      const data = {
        email: req.body.email,
        token: token,
        userName: user.userName,
        photo: user.image,
        userID: user.id,
        first_user: user.first_user,
        priceID: subscription.price,
        subscription: subscription.subscriptionID,
        stripeCustomerID: user.stripeCustomerID,
      };

      user.otp = null;
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
      if (user) {
        res.status(200).json({
          message: "success",
          status: 200,
          user: data,
        });
      } else {
        res.status(404).json({
          message: "Not found",
          status: 404,
        });
      }
    }
  } else {
    res.status(404).json({
      message: "Not found",
      status: 404,
    });
  }
};
const logout = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  const token = await Token.findOne({
    where: { token: bearerHeader },
  });
  if (token) {
    // req.session.destroy;
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

module.exports = { logout, isUserEmailExists, verifyOTP, getUser, passLogin };
