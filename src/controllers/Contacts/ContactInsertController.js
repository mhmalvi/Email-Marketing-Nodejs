const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const insertContact = async (req, res) => {
  const json = req.body;
  const data = JSON.parse(req.params.userID);
  console.log(data);
  if (json !== null) {
    await json.forEach((element) => {
      const UserCollectionExist = JSON.stringify(fetch(data));
      const collection = JSON.parse(UserCollectionExist);
      console.log(collection);
      if (collection.length > 0) {
        JSON.parse(UserCollectionExist).forEach((user) => {
          console.log(user.json.email);
          if (element.email !== user.json.email) {
            saveContact(element, userID);
          }
        });
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
