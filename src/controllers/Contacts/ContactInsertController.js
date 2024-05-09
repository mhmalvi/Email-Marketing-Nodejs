const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const insertContact = (req, res) => {
  console.log(JSON.parse(req.params.userID));
  const json = req.body;
  const userID = req.params.userID;
  const existUserCollection = fetch(userID);
  console.log(existUserCollection);
  if (json !== null) {
    json.forEach((element) => {
      
      // existUserCollection.forEach((user) => {
      //   // if(user.)
      //   console.log(user);
      // })
      // saveContact(element, userID);
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
