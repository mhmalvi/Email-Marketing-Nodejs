const express = require("express");
const { updateOne } = require("../../common/appPassUtils/updateOne");
const { fetchOne } = require("../../common/appPassUtils/fetchOne");
const updateAppPassword = async (req, res) => {
  if (req.body.email && req.body.userID) {
    let app = await fetchOne(req.body);
    if (app) {
      const result = await updateOne(req.body);
      console.log(result);
      if (result[0] === 1) {
        let pass = await fetchOne(req.body);
        res.status(201).json({
          message: "Updated",
          status: 201,
          data: pass,
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
