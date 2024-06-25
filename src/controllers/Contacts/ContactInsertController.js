const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const {
  ifContactExist,
} = require("../../common/contactsUtils/checkIfContactExist");
const insertContact = async (req, res) => {
  const json = req.body;
  console.log(json);
  const data = JSON.parse(req.params.userID);
  console.log(data);
  if (json.length > 0) {
    // const UserCollectionExist = JSON.stringify(await fetch(data));

    await json.forEach(async (element) => {
      // console.log("string", UserCollectionExist);
      // const collection = JSON.parse(UserCollectionExist);
      console.log("element", element);
      var count = 0;
      const userCollectionExist = await ifContactExist(data, element);
      console.log("userCollectionExist", userCollectionExist);
      if (!userCollectionExist) {
        saveContact(element, data);
      }
    });
    res.status(201).json({
      message: "Contact inserted",
      status: 201,
      contact: JSON.stringify(json),
    });
  } else {
    res.status(403).json({
      message: "No data given",
      status: 403,
    });
  }
};

module.exports = { insertContact };
