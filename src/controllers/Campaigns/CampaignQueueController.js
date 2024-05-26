const express = require("express");
const Campaign = require("../../../models").Campaignqueue;
const Emailqueue = require("../../../models").Emailqueue;
const { saveCampaign } = require("../../common/campaignUtils/saveCampaign");
const Campaignqueue = require("../../../models").Campaignqueue;

const campaignQueue = async (req, res) => {
  console.log(req.body);
  //   const campaign = await saveCampaign(req.body);
  await Campaignqueue.create({
    fromMail: req.body.campaignInfo.fromMail,
    fromName: req.body.campaignInfo.fromName,
    count: 5,
    userID: req.body.userID,
  });
  console.log(campaign);
};

module.exports = { campaignQueue };
