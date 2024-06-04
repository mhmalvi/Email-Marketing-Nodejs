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
  
  if (json.length > 0) {
    await json.forEach(async (element) => {
      console.log(data);
      const UserCollectionExist = await JSON.stringify(ifContactExist(data));
      console.log("string", UserCollectionExist);
      // const collection = JSON.parse(UserCollectionExist);
      // console.log("abc", collection);
      var count = 0;
      if (UserCollectionExist.length > 0) {
        if (!UserCollectionExist.includes(element.email)) {
          saveContact(element, data);
        }
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
