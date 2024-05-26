const express = require("express");
const AppPassword = require("../../../models").AppPassword;
const { save } = require("../../common/appPassUtils/save");
const { fetchOne } = require("../../common/appPassUtils/fetchOne");

const saveAppPassword = async (req, res) => {
  if (req.body.email && req.body.email && req.body.email) {
    const isEmailExist = await fetchOne(req.body);
    if (isEmailExist) {
      res.status(409).json({
        message: "Email already exists",
        status: 409,
      });
    } else {
      const app = await save(req.body);
      if (app) {
        res.status(201).json({
          message: "Saved",
          status: 201,
          data: app,
        });
      } else {
        res.status(500).json({
          message: "Failed",
          status: 500,
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
