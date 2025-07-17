const express = require("express");
const { cronJob, enqueueEmailJob } = require("../src/controllers/CronController");
const cronRoutes = express.Router();

cronRoutes.route("/cron").get(async (req, res) => {
  await enqueueEmailJob();
  res.json({ status: 'Email job enqueued' });
});

module.exports = {cronRoutes};