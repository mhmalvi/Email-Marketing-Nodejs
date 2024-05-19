const express = require("express");
const { saveTemplate } = require("../../common/templateUtils/insert");
const { findOne } = require("../../common/templateUtils/findOne");
const insertTemplate = async (req, res) => {
  if (req.body.name && req.body.template && req.body.user_id) {
    const response = await findOne(req.body);
    console.log(response);
    if (response === null) {
      console.log(response);
      const results = await saveTemplate(req.body);
      if (results) {
        res.status(201).json({
          message: "Template inserted",
          status: 201,
          data: results,
        });
      } else {
        res.status(500).json({
          message: "Failed",
          status: 500,
        });
      }
    } else {
      res.status(409).json({
        message: "Template name already exists",
        status: 409,
      });
    }
  } else {
    res.status(422).json({
      message: "Please enter all fields",
      status: 422,
    });
  }
};

module.exports = { insertTemplate };
