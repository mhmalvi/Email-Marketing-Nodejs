const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const { fetchByGroup } = require("../../common/contactsUtils/fetchByGroup");
const { getPagingData, getPagination } = require("../../../config/utils");
const fetchContact = async (req, res) => {
  const data = JSON.parse(req.body.userID);
  const page = req.body.page;
  const size = req.body.per_page;
  // console.log(page);
  // console.log(size);
  if (data) {
    // const { limit, offset } = getPagination(page, size);
    // console.log(limit);
    offset = (page - 1) * size;
    // const result = await fetch(data, size, offset);
    const total = await Contact.findAll({
      where: { user_id: data },
      order: [["id", "DESC"]],
    });
    const totalPages = total.length / size;
    console.log(Math.ceil(totalPages));
    const result = await fetch(data, size, offset);
    // result.push(totalPages);
    // console.log(result);
    // const response = await getPagingData(result, page, size);
    // console.log(response);
    if (result) {
      res.status(200).json({
        message: "success",
        status: 200,
        contact: result,
        total: total.length,
        totalPages: Math.ceil(totalPages),
        current_page: page,
      });
    }
  } else {
    res.status(403).json({
      message: "No data given",
      status: 403,
    });
  }
};

const contactFetchByGroup = async (req, res) => {
  const { user_id, group } = req.body;
  console.log(user_id);
  if (user_id && group) {
    const result = await fetchByGroup(user_id, group);
    if (result.length > 0) {
      res.status(200).json({
        message: "success",
        status: 200,
        contacts: result,
      });
    } else {
      res.status(404).json({
        message: "No contacts found",
        status: 404,
      });
    }
  } else {
    res.status(422).json({
      message: "Please provide details",
      status: 422,
    });
  }
};
module.exports = { fetchContact, contactFetchByGroup };
