const express = require("express");
const Campaign = require("../../../models").Campaignqueue;
const Emailqueue = require("../../../models").Emailqueue;
const { saveCampaign } = require("../../common/campaignUtils/saveCampaign");
const Campaignqueue = require("../../../models").CampaignQueue;

const campaignQueue = async (req, res) => {
  console.log(req.body);
    const campaign = await saveCampaign(req.body);
  
    console.log(campaign);
    // if()
};

module.exports = { campaignQueue };
