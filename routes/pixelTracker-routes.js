const express = require("express");
const pixelTracker = express.Router();

pixelTracker.get(`/open/:id`, (req, res) => {
  const pixelId = req.params.id;
  console.log(pixelId);
  res.sendFile("1x1.png", { root: __dirname+'../' });
});

module.exports = { pixelTracker };
