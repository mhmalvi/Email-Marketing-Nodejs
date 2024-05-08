const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils.js/saveContact");
const insertContact = async (req, res) => {
  console.log(req.params.userID);
  const json = req.body;
  const userID = req.params.userID;
  if (json && userID) {
    await json.forEach((element) => {
      saveContact(element, userID);
    });
    res.status(201).json({
      message: "Contact inserted",
      status: 201,
      contact: JSON.stringify(json),
    });
  } else {
    res.status(403),
      json({
        message: "No data given",
        status: 403,
      });
  }
};

module.exports = { insertContact };
