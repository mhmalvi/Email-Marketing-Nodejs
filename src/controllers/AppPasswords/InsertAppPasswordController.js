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
      // if (app) {
      // const sender = await AppPassword.findOne({
      //   where: { email: req.body.email },
      // }); ////////////  get app password of the sender from db //////////////////
      // console.log(sender);

      let transporterResponse = await transporter(req.body);
      const mailOptions = {
        from: `<${req.body.email}>`,
        to: `${req.body.email}`, // list of receivers
        subject: "App password verification", // Subject line
        html: `<h1>Hello</h1><br><p>Your app password is correct.</p> `,
      };
      try {
        await transporterResponse.sendMail(mailOptions);
        const app = await save(req.body);
        res.status(201).json({
          message: "Saved",
          status: 201,
          data: app,
        });
      } catch (error) {
        res.status(422).json({
          message: "Incorrect email or app password",
          status: 422,
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
