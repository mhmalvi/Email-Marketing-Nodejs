const express = require("express");
const { saveCampaign } = require("../../common/campaignUtils/saveCampaign");
const { queueMail } = require("../../common/campaignUtils/queueMail");
const {
  retrieveSubscriptionFromDB,
} = require("../../common/subscription/retrieveSubscriptionDB");
const {
  retrieveSingleSubscription,
} = require("../../common/stripe/subscription/retrieveSingleSubscription");
const { mailCounts } = require("../../common/campaignUtils/fetchCampaigns");
const Product = require("../../../models").Product;

const campaignQueue = async (req, res) => {
  const data = req.body;
  const email_count = data.recipient.length; ///// get email count

  //////////////////////////////////////////////

  const productDB = await getProductDetailsFromDB(data.userID); /// product details of authenticated user from DB

  //////////////////////////////////////////////
  var mailCount = await mailCounts(data.userID); ////get mail count for today
  if (mailCount === 0 || mailCount === null) {
    mailCount = 0;
  }
  const total_mail = email_count + mailCount;
  if (total_mail < productDB.emailLimit) {
    const campaign = await saveCampaign(req.body); ////// create individual campaigns

    //////////////////////////////////////////////
res.json(data.template.data)
    // if (campaign) {
    //   const result = await queueMail(data, campaign.id); ////// queue emails ////////
    //   if (result === 1) {
    //     res.status(200).json({
    //       message: "Queued",
    //       status: 200,
    //     });
    //   } else {
    //     res.status(500).json({
    //       message: "Failed",
    //       status: 500,
    //     });
    //   }
    // }
  } else {
    res.status(422).json({
      message: "Email limit reached",
      status: 422,
    });
  }
};

/////////////////////// helper method ///////////////////////
const getProductDetailsFromDB = async (userID) => {
  const subscriptionDB = await retrieveSubscriptionFromDB(userID); //// fetch user subscription from DB

  //////////////////////////////////////////////

  var subscriptionName = "";
  if (subscriptionDB.subscriptionID !== null) {
    const stripeSubscription = await retrieveSingleSubscription(
      subscriptionDB.subscriptionID
    ); ///fetch user subscription from stripe

    //////////////////////////////////////////////

    subscriptionName = stripeSubscription.items.data[0].price.nickname; /// get subscription name of user from stripe
  } else {
    subscriptionName = "free"; ////// else subscription name is 'free'
  }

  //////////////////////////////////////////////

  return await Product.findOne({
    where: { productName: subscriptionName },
  }); /// get the product details by product name of user from db

  /////////////////////// helper method///////////////////////
};

module.exports = { campaignQueue };
