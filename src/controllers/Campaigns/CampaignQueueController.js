const express = require("express");
const cron = require("node-cron");
const { saveCampaign } = require("../../common/campaignUtils/saveCampaign");
const { queueMail } = require("../../common/campaignUtils/queueMail");
const { sendMail } = require("../../common/campaignUtils/sendMailInstant");

const campaignQueue = async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const campaign = await saveCampaign(req.body); ////// create individual campaigns
  console.log(campaign.id);
  //////////////////////////////////////////////
  if (campaign) {
    const result = await queueMail(data, campaign.id); //////queue emails////////
    console.log(result);
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

// cron.schedule("* * * * *", () => {
//   console.log("job");
//   sendMail();
// });

module.exports = { campaignQueue };
