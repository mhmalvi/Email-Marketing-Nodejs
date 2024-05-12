const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const { getPagingData } = require("../../../config/utils");
const fetchContact = async (req, res) => {
  const data = JSON.parse(req.body.userID);
  const page = req.body.page;
  const limit = req.body.limit;
  if (data) {
    const result = await fetch(data);
    const response = await getPagingData(result, page, limit);
    if (response) {
      res.status(200).json({
        message: "success",
        status: 200,
        contact: response,
      });
    }
  } else {
    res.status(403).json({
      message: "No data given",
      status: 403,
    });
  }
};

module.exports = { fetchContact };
