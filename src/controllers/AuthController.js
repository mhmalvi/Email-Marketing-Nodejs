const express = require("express");
const Token = require("../../models").Token;
const User = require("../../models").User;
const sendmail = require("sendmail")();
const { transporter, generateOTP } = require("../../config/utils");
const { saveToken } = require("../common/utils");
const keys = require("../../config/keys");
let nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");
let { defaultProvider } = require("@aws-sdk/credential-provider-node");

const isUserEmailExists = async (req, res) => {
  // const user = await User.findOne({ where: { email: req.body.email } });
  // if (user) {
  const otp = generateOTP();
  // user.otp = otp;
  // console.log(user);
  // await user.save();

  const ses = await new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1",
    defaultProvider,
  });
  let transporter = await nodemailer.createTransport({
    SES: { ses, aws },
  });
  // await transporter.sendMail({
  //   from: keys.mail.user,
  //   to: req.body.email, // list of receivers
  //   subject: "Password verification", // Subject line
  //   text: `Your Password is ${otp}`, // plain text body
  //   // html: "<b>Hello world?</b>", // html body
  // });
  transporter.sendMail(
    {
      from: "info@quadque.tech",
      to: req.body.email,
      subject: "Password verification",
      text: `Your Password is ${otp}`,
      ses: {
        // optional extra arguments for SendRawEmail
        Tags: [
          {
            Name: "tag_name",
            Value: "tag_value",
          },
        ],
      },
    },
    (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
    }
  );
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
  // } else {
  //   res.status(404).json({
  //     status: false,
  //   });
  // }
};

const verifyOTP = async (req, res) => {
  if (req.body.otp && req.body.email && req.body.otp !== 0) {
    const user = await User.findOne({
      where: { email: req.body.email },
      where: { otp: req.body.otp },
    });

    if (user) {
      const data = {
        email: req.body.email,
        token: req.body.token,
      };
      user.otp = 0;
      await user.save();
      await saveToken(data);
      res.status(200).json({
        message: "OTP found",
        status: 200,
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

module.exports = { logout, isUserEmailExists, verifyOTP };
