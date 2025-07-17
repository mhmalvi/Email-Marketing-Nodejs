const express = require("express");
const AppPassword = require("../../../models").AppPassword;
const { destroy } = require("../../common/appPassUtils/destroy");
const logger = require("../../common/utils/logger");

const destroyAppPassword = async (req, res) => {
  if (req.body.id && req.body.userID) {
    logger.debug(req.body);
    const result = await destroy(req.body);
    logger.debug(result);
    if (result === 1) {
      res.status(201).json({
        message: "Deleted",
        status: 201,
      });
    } else {
      res.status(404).json({
        message: "Email not found",
        status: 404,
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
