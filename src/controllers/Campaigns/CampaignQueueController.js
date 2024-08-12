const express = require("express");
const { saveCampaign } = require("../../common/campaignUtils/saveCampaign");
const { queueMail } = require("../../common/campaignUtils/queueMail");
const {
  retrieveSubscriptionFromDB,
} = require("../../common/subscription/retrieveSubscriptionDB");
const {
  retrieveSingleSubscription,
} = require("../../common/stripe/subscription/retrieveSingleSubscription");

const campaignQueue = async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const email_count = data.recipient.length; ///// get email count

  //////////////////////////////////////////////

  const subscriptionDB = await retrieveSubscriptionFromDB(data.userID); //// fetch user subscription from DB
  var subscriptionName = "";
  if (subscriptionDB.subscriptionID !== null) {
    const stripeSubscription = await retrieveSingleSubscription(
      subscriptionDB.subscriptionID
    ); ///fetch user subscription from stripe
    subscriptionName = stripeSubscription.items.data[0].price.lookup_key; /// get subscription name of user from stripe
  } else {
    subscriptionName = "free"; ////// else subscription name is 'free'
  }
  const productDB = await Product.findOne({
    where: { productName: subscriptionName },
  }); /// get the product name of user from db

  //////////////////////////////////////////////

  if (email_count < productDB.emailLimit) {
    const campaign = await saveCampaign(req.body); ////// create individual campaigns

    //////////////////////////////////////////////

    if (campaign) {
      const result = await queueMail(data, campaign.id); ////// queue emails ////////
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
  } else {
    res.status(422).json({
      message: "Email limit reached",
      status: 422,
    });
  }
};

module.exports = { campaignQueue };
