const express = require("express");
const sequelize = require("sequelize");
const Contact = require("../../../models").Contact;
const { destroy } = require("../../common/contactsUtils/delete");
const { findOne } = require("../../common/contactsUtils/findOne");
const { getPagingData, getPagination } = require("../../../config/utils");
const { helpers } = require("handlebars/runtime");

const destroyContact = async (req, res) => {
  if (req.body.id && req.body.userID) {
    let contact = await findOne(req.body.id);
    if (contact) {
      const result = await destroy(req.body);
      console.log(result);
      if (result === 1) {
        await resetAutoIncrement();
        res.status(201).json({
          message: "Deleted",
          status: 201,
        });
      } else {
        res.status(500).json({
          message: "Failed",
          status: 500,
        });
      }
    } else {
      res.status(404).json({
        message: "Not found",
        status: 404,
      });
    }
  } else {
    res.status(422).json({
      message: "Please provide all the fields",
      status: 422,
    });
  }
};

module.exports = { destroyContact };

// ------------------------------helpers--------------------------

const resetAutoIncrement = async () => {
  try {
    // Start a transaction for safety
    await sequelize.transaction(async (t) => {
      // Find the maximum value of the auto-increment column (e.g., `id`)
      const maxId = await Contact.max("id", { transaction: t });

      if (maxId) {
        // Use Sequelize's `query` method to run raw SQL for setting the auto-increment
        await sequelize.query(
          `ALTER TABLE your_table AUTO_INCREMENT = ${maxId + 1}`,
          { transaction: t }
        );
        console.log(`Auto-increment reset to start from ${maxId + 1}`);
      } else {
        console.log("Table is empty. Auto-increment remains at default.");
      }
    });
  } catch (error) {
    console.error("Error resetting auto-increment:", error);
  }
};