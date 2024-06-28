const express = require("express");
const Contact = require("../../../models").Contact;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch } = require("../../common/contactsUtils/fetch");
const {
  ifContactExist,
} = require("../../common/contactsUtils/checkIfContactExist");
const { fieldsValidation } = require("../../../config/utils");

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

const insertContactManually = async (req, res) => {
  console.log(req.body);
  const { userID, email, name, group } = req.body;
  const requiredFields = { userID, email, name, group };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const userCollectionExist = await ifContactExist(userID, req.body);
    if (!userCollectionExist) {
      saveContact(req.body, userID);
      res.status(201).json({
        message: "Contact inserted",
        status: 201,
        contact: req.body,
      });
    }
  }
};

module.exports = { insertContact, insertContactManually };
