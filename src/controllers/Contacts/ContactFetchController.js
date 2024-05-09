const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const fetchContact = async (req, res) => {
  const data = req.body.userID;
  if (data) {
    const result = await fetch(data);
    if (result) {
      res.status(200).json({
        message: "success",
        status: 200,
        contact: result,
      });
    }
  } else {
    res.status(403).
      json({
        message: "No data given",
        status: 403,
      });
  }
};

module.exports = { fetchContact };
