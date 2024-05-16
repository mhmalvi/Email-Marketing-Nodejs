const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const { updateOne } = require("../../common/contactsUtils/update");
const { findOne } = require("../../common/contactsUtils/findOne");
const { getPagingData, getPagination } = require("../../../config/utils");

const updateContact = async (req, res) => {
  const contact = await findOne(req.body.id);
  if (contact) {
    const result = await updateOne(req.body);
    console.log(result);
    if ((result === 1)) {
      res.status(201).json({
        message: "Updated",
        status: 201,
        data: result,
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
};

module.exports = { updateContact };
