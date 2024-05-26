const express = require("express");
const AppPassword = require("../../../models").AppPassword;
const { fetchAll } = require("../../common/appPassUtils/fetchAll");

const fetchAppPasswords = async (req, res) => {
  if (req.body.userID) {
    console.log(req.body.userID);
    const emails = await fetchAll(req.body.userID);
    if (emails) {
      res.status(200).json({
        message: "success",
        status: 200,
        emails: emails,
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
