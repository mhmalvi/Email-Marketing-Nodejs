const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const { getPagingData, getPagination } = require("../../../config/utils");
const fetchContact = async (req, res) => {
  const data = JSON.parse(req.body.userID);
  const page = req.body.page;
  const size = req.body.per_page;
  if (data) {
    // const { limit, offset } = getPagination(page, size);
    // console.log(limit);
    offset = (page-1)*page
    // const result = await fetch(data, size, offset);
    const result = await Contact.findAll({
      where: { user_id: data },
      order: [["id", "DESC"]],
    });
    console.log(result.json());
    const response = await getPagingData(result, page, size);
    // console.log(response);
    if (result) {
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
