const express = require("express");
const Contact = require("../../../models").Contact;
const { destroy } = require("../../common/contactsUtils/delete");
const { findOne } = require("../../common/contactsUtils/findOne");
const { getPagingData, getPagination } = require("../../../config/utils");

const destroyContact = async (req, res) => {
  if (req.body.id && req.body.user_id) {
    let contact = await findOne(req.body.id);
    if (contact) {
      const result = await destroy(req.body);
      console.log(result);
      if (result === 1) {
        res.status(201).json({
          message: "Deleted",
          status: 201,
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

module.exports = { destroyContact };
