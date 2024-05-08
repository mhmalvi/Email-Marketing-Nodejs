const express = require("express");
const Contact = require("../../models").Contact;
const { saveContact } = require("../common/contactsUtils.js/saveContact");
const saveContact = async (req, res) => {
  const json = req.body;
  if (response) {
    await json.forEach((element) => {
      saveContact(element);
    });
    res.status(201).json({
      message: "Contact inserted",
      status: 201,
      contact: json,
    });
  } else {
    res.status(403),
      json({
        message: "No data given",
        status: 403,
      });
  }
};

module.exports = { saveContact };
