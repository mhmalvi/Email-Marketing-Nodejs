const express = require("express");
const AppPassword = require("../../../models").AppPassword;
const { destroy } = require("../../common/appPassUtils/destroy");

const destroyAppPassword = async (req, res) => {
  if (req.body.id && req.body.userID) {
    console.log(req.body);
    const result = await destroy(req.body);
    console.log(result);
    if (result === 1) {
      res.status(201).json({
        message: "Deleted",
        status: 200,
      });
    } else {
      res.status(500).json({
        message: "Failed",
        status: 500,
      });
    }
  } else {
    res.status(422).json({
      message: "Please provide all the required fields",
      status: 422,
    });
  }
};
module.exports = { destroyAppPassword };
