const express = require("express");
const { cronJob } = require("../src/controllers/CronController");
const cronRoutes = express.Router();

cronRoutes.route("/cron").get(cronRoutes);

module.exports = {cronRoutes};