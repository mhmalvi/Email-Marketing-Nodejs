const { fieldsValidation } = require("../../../config/utils");
const {
  mailCounts,
  campaignCounts,
} = require("../../common/campaignUtils/fetchCampaigns");
const { contactCounts } = require("../../common/contactsUtils/fetch");
const {
  retrieveSingleSubscription,
} = require("../../common/stripe/subscription/retrieveSingleSubscription");
const {
  retrieveSubscriptionFromDB,
} = require("../../common/subscription/retrieveSubscriptionDB");
const Product = require("../../../models").Product;

const counts = async (req, res) => {
  const { userID, role } = req.body;
  const requiredFields = { userID, role };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const subscriptionDB = await retrieveSubscriptionFromDB(userID); //// fetch user subscription from DB
    var subscriptionName = "";
    if (subscriptionDB.subscriptionID !== null) {
      const stripeSubscription = await retrieveSingleSubscription(
        subscriptionDB.subscriptionID
      ); ///fetch user subscription from stripe
      subscriptionName = stripeSubscription.items.data[0].price.nickname; /// get subscription name of user from stripe
    } else {
      if (role === 0) {
        subscriptionName = "Custom"; //// else subscription name is 'custom'
      } else if (role === 3) {
        subscriptionName = "free"; //// else subscription name is 'free'
      }
    }
    const productDB = await Product.findOne({
      where: { productName: subscriptionName },
    }); /// get the product name of user from db

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    const mailCount = await mailCounts(userID); ////get mail count for today
    const contactsCount = await contactCounts(userID); ///get contacts count for today
    const campaignCount = await campaignCounts(userID); //get campaign counts for today

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    const countForToday = {
      mailCount: mailCount === "undefined" ? 0 : mailCount,
      contactsCount: contactsCount === "undefined" ? 0 : contactsCount,
      campaignCount: campaignCount === "undefined" ? 0 : campaignCount,
    }; ////// count for today's used limit

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    const remainingLimit = {
      remainingMail:
        mailCount === "undefined" ? 0 : productDB.emailLimit - mailCount,
      remainingContact:
        contactsCount === "undefined"
          ? 0
          : productDB.contactLimit - contactsCount,
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    res.status(200).json({
      message: "success",
      status: 200,
      productDB: productDB,
      countPerPackage: countForToday,
      remainingLimit: remainingLimit,
    });
  }
};

module.exports = { counts };
