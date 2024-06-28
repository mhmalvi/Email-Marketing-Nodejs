const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const { updateOne } = require("../../common/contactsUtils/update");
const { findOne } = require("../../common/contactsUtils/findOne");
const { getPagingData, getPagination } = require("../../../config/utils");

const updateContact = async (req, res) => {
  if (req.body.id && req.body.user_id && req.body.json) {
    let contact = await findOne(req.body.id); /// //// check if contact exist before update ////////
    if (contact) {
      const result = await updateOne(req.body); /// //// update contact ////////
      console.log(result);
      if (result[0] === 1) {
        let contact = await findOne(req.body.id); ////////  fetch updated data /////////
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

module.exports = { updateContact };
