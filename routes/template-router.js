const express = require("express");
const Contact = require("../models").Contact;
const templateRouter = express.Router();
const {
  insertTemplate,
} = require("../src/controllers/Templates/TemplateInsertController");

templateRouter.route("/template-save").post(insertTemplate);

module.exports = { templateRouter };
