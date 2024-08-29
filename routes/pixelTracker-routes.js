const express = require("express");
const pixelTracker = express.Router();
const EmailQueue = require("../models").EmailQueue;

pixelTracker.get(`/open/:id`, (req, res) => {
  const pixelId = req.params.id;
  //   console.log(pixelId);
  EmailQueue.update({ open: 1 }, { where: { id: pixelId } });
  res.sendFile("1x1.png", { root: __dirname });
});

pixelTracker.get(`/terminateOne/:id`, (req, res) => {
  const pixelId = req.params.id;
  //   console.log(pixelId);
  EmailQueue.update({ open: 0 }, { where: { id: pixelId } });
  // res.sendFile("1x1.png", { root: __dirname });
});

pixelTracker.get(`/click/:url`, (req, res) => {
  const url = req.params.url;
  res.send(url);
});

module.exports = { pixelTracker };
