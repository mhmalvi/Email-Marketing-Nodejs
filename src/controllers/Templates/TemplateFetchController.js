const express = require("express");
const { fetchAll } = require("../../common/templateUtils/fetchAll");
const logger = require("../../common/utils/logger");

const fetchTemplates = async (req, res) => {
  logger.debug(req.body);
  if (req.body.client_id) {
    const templates = await fetchAll(JSON.parse(req.body.client_id));
    if (templates) {
      res.status(200).json({
        message: "success",
        status: 200,
        templates: templates,
      });
    } else {
      res.status(404).json({
        message: "No templates found",
        status: 404,
      });
    }
  } else {
    res.status(422).json({
      message: "Please provide user",
      status: 422,
    });
  }
};

module.exports = { fetchTemplates };
