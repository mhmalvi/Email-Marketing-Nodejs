const express = require("express");
const { updateOne } = require("../../common/appPassUtils/updateOne");
const { fetchByID } = require("../../common/appPassUtils/fetchByID");
const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");
const updateAppPassword = async (req, res) => {
  if (req.body.id && req.body.userID) {
    let app = await fetchByID(req.body);
    if (app) {
      //
      try {
        // let pass = await fetchByID(req.body);
        let transporterResponse = await transporter(req.body);
        const mailOptions = {
          from: `<${req.body.email}>`,
          to: `${req.body.email}`, // list of receivers
          subject: "App password verification", // Subject line
          html: `<h1>Hello ${req.body.email}</h1><br><p>Your app password is correct.</p> `,
        };
        await transporterResponse.sendMail(mailOptions);
        const result = await updateOne(req.body);
        if (result[0] === 1) {
          res.status(201).json({
            message: "Updated",
            status: 201,
            data: req.body,
          });
        }
      } catch (error) {
        res.status(535).json({
          message: "Incorrect email or app password",
          status: 535,
        });
      }
    } else {
      res.status(404).json({
        message: "Not found",
        status: 404,
      });
    }
  } else {
    res.status(422).json({
      message: "Please provide all the fields",
      status: 422,
    });
  }
};

module.exports = { updateAppPassword };
