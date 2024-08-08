const express = require("express");
const { save } = require("../../common/appPassUtils/save");
const { fetchOne } = require("../../common/appPassUtils/fetchOne");
const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");
const AppPassword = require("../../../models").AppPassword;

const saveAppPassword = async (req, res) => {
  if (
    req.body.email &&
    req.body.appPassword &&
    req.body.userID &&
    req.body.provider
  ) {
    const isEmailExist = await fetchOne(req.body);
    if (isEmailExist) {
      res.status(409).json({
        message: "An Email with  " + req.body.provider + "  already exists",
        status: 409,
      });
    } else {
      const app = await save(req.body);
      if (app) {
        const sender = await AppPassword.findOne({
          where: { email: req.body.email },
        }); ////////////  get app password of the sender from db //////////////////
        let transporterResponse = await transporter(sender);
        const mailOptions = {
          from: `<${req.body.email}>`,
          to: `${req.body.email}`, // list of receivers
          subject: "App password verification", // Subject line
          html: `<h1>Hello ${req.body.email}</h1><br><p>Your app password is correct.</p> `,
        };
        await transporterResponse.sendMail(mailOptions, async (err, info) => {
          if (err.statusCode === 535) {
            res.status(535).json({
              message: `Your app password for email ${mail.fromName} is wrong`,
              status: 535,
              email: `${req.body.email}`,
            });
          } else {
            console.log(info.accepted[0]);
            console.log("Email sent", info.accepted);
          }
        });
        res.status(201).json({
          message: "Saved",
          status: 201,
          data: app,
        });
      } else {
        res.status(500).json({
          message: "Failed",
          status: 500,
        });
      }
    }
  } else {
    res.status(422).json({
      message: "Please enter all the fields",
      status: 422,
    });
  }
};

module.exports = { saveAppPassword };
