const express = require("express");
const { updateOne } = require("../../common/appPassUtils/updateOne");
const { fetchByID } = require("../../common/appPassUtils/fetchByID");
const logger = require("../../common/utils/logger");
const updateAppPassword = async (req, res) => {
  if (req.body.id && req.body.userID) {
    let app = await fetchByID(req.body);
    if (app) {
      const result = await updateOne(req.body);
      logger.debug(result);
      if (result[0] === 1) {
        let pass = await fetchByID(req.body);
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
