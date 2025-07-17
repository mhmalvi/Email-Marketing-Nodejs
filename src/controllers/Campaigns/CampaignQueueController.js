const express = require("express");
const { saveCampaign } = require("../../common/campaignUtils/saveCampaign");
const { queueMail } = require("../../common/campaignUtils/queueMail");

const campaignQueue = async (req, res) => {
  const data = req.body;
  const campaign = await saveCampaign(req.body);
  if (campaign) {
    const result = await queueMail(data, campaign.id);
    if (result === 1) {
      res.status(200).json({
        message: "Queued",
        status: 200,
      });
    } else {
      res.status(500).json({
        message: "Failed",
        status: 500,
      });
    }
  }
};

module.exports = { campaignQueue };
