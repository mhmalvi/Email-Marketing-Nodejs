const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const insertContact = async (req, res) => {
  const json = req.body;
  const data = JSON.parse(req.params.userID);
  console.log(data);

  // console.log(UserCollectionExist);
  if (json !== null) {
    json.forEach((element) => {
      const UserCollectionExist = fetch(data);
      UserCollectionExist.forEach((user) => {
        // if(user.)

        console.log(user);
      });
      saveContact(element, userID);
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
