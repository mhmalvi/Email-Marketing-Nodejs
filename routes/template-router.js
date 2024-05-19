const express = require("express");
const Contact = require("../models").Contact;
const templateRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const {
  insertTemplate,
} = require("../src/controllers/Templates/TemplateInsertController");
const {
  fetchTemplates,
} = require("../src/controllers/Templates/TemplateFetchController");
// templateRouter
//   .route("/template-save")
//   .post(isCustomerAuthenticated, insertTemplate);
templateRouter.route("/template-save").post(insertTemplate);
templateRouter
  .route("/template-fetch")
  .post(isCustomerAuthenticated,fetchTemplates);

module.exports = { templateRouter };
