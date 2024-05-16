const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const { getPagingData, getPagination } = require("../../../config/utils");
const fetchContact = async (req, res) => {
  const data = JSON.parse(req.body.userID);
  const page = req.body.page;
  const size = req.body.size;
  if (data) {
    const { limit, offset } = getPagination(page, size);
    // console.log(limit);
    const result = await fetch(data, size, offset);
    const response = await getPagingData(result, page, limit);
    console.log(response);
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
