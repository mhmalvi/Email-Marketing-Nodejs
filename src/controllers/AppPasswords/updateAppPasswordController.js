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
      let pass = await fetchByID(req.body);
      let transporterResponse = await transporter(pass);
      const mailOptions = {
        from: `<${pass.email}>`,
        to: `${pass.email}`, // list of receivers
        subject: "App password verification", // Subject line
        html: `<h1>Hello ${pass.email}</h1><br><p>Your app password is correct.</p> `,
      };
      try {
        await transporterResponse.sendMail(mailOptions);
        const result = await updateOne(req.body);
        if (result[0] === 1) {
          res.status(201).json({
            message: "Updated",
            status: 201,
            data: pass,
          });
        }
      } catch (error) {
        res.status(422).json({
          message: "Incorrect email or app password",
          status: 422,
        });
      }
      // } else {
      //   res.status(500).json({
      //     message: "Failed",
      //     status: 500,
      //   });
      // }
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
