const express = require("express");
const Campaign = require("../../../models").Campaignqueue;
const Emailqueue = require("../../../models").Emailqueue;
const { insertCampaign } = require("../../common/campaignUtils/saveCampaign");

const campaignQueue = async (req, res) => {
  console.log(req.body);
  const campaign = await insertCampaign(req.body);
  console.log(campaign);
};

module.exports = { campaignQueue };
