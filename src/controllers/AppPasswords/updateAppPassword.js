const express = require("express");
const AppPassword = require("../../../models").AppPassword;
const updateAppPassword = async (req, res) => {
  if (req.body.id && req.body.user_id) {
    let contact = await findOne(req.body.id);
    if (contact) {
      const result = await updateOne(req.body);
      console.log(result);
      if (result[0] === 1) {
        let contact = await findOne(req.body.id);
        res.status(201).json({
          message: "Updated",
          status: 201,
          data: contact,
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
  } else {
    res.status(422).json({
      message: "Please provide all the fields",
      status: 422,
    });
  }
};

module.exports = { updateAppPassword };