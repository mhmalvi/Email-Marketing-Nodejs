const express = require("express");
const AppPassword = require("../../../models").AppPassword;
const { fetchAll } = require("../../common/appPassUtils/fetchAll");
const logger = require("../../common/utils/logger");

const fetchAppPasswords = async (req, res) => {
  if (req.body.userID) {
    logger.debug(req.body.userID);
    const emails = await fetchAll(req.body.userID);
    logger.debug(emails);
    if (emails) {
      res.status(200).json({
        message: "success",
        status: 200,
        emails,
      });
    } else {
      res.status(404).json({
        message: "no email found",
        status: 404,
      });
    }
  } else {
    res.status(422).json({
      message: "Please provide user id",
      status: 422,
    });
  }
};

module.exports = { fetchAppPasswords };
