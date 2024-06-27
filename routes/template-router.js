const express = require("express");
const templateRouter = express.Router();
const { isCustomerAuthenticated } = require("../src/middleware/userMiddleware");
const {
  insertTemplate,
} = require("../src/controllers/Templates/TemplateInsertController");
const {
  fetchTemplates,
} = require("../src/controllers/Templates/TemplateFetchController");
const {
  templateDestroy,
} = require("../src/controllers/Templates/TemplateDestroyController");
const {
  templateUpdate,
} = require("../src/controllers/Templates/TemplateUpdateController");
// templateRouter
//   .route("/template-save")
//   .post(isCustomerAuthenticated, insertTemplate);
templateRouter
  .route("/template-save")
  .post(isCustomerAuthenticated, insertTemplate);
templateRouter
  .route("/template-fetch")
  .post(isCustomerAuthenticated, fetchTemplates);
templateRouter
  .route("/template-update")
  .post(isCustomerAuthenticated, templateUpdate);
templateRouter
  .route("/template-destroy")
  .post(isCustomerAuthenticated, templateDestroy);

module.exports = { templateRouter };
