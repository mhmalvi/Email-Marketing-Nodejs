const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const insertContact = async (req, res) => {
  const json = req.body;
  console.log(json);
  const data = JSON.parse(req.params.userID);
  console.log(data);
  if (json.length > 0) {
    const UserCollectionExist = JSON.stringify(await fetch(data));
    await json.forEach((element) => {
      // console.log("string", UserCollectionExist);
      const collection = JSON.parse(UserCollectionExist);
      console.log("abc", collection);
      var count = 0;
      if (collection.length > 0) {
        collection.forEach((user) => {
          console.log("user", user.json.email);
          console.log("json", element.email);

          if (element.email === user.json.email) {
            count = 1;
          }
          console.log("count", count);
          if (count === 0) {
            saveContact(element, data);
          }
        });
      }
      // else {
      //   saveContact(element, data);
      // }
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
