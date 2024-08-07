const { fieldsValidation } = require("../../../config/utils");
const {
  mailCounts,
  campaignCounts,
} = require("../../common/campaignUtils/fetchCampaigns");
const { contactCounts } = require("../../common/contactsUtils/fetch");

const counts = async (req, res) => {
  const { userID } = req.body;
  const requiredFields = { userID };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const mailCount = await mailCounts(userID); ////get mail count for today
    const contactsCount = await contactCounts(userID); ///get contacts count for today
    const campaignCount = await campaignCounts(userID); //get campaign counts for today
    console.log("ccampaignCount", campaignCount);
    console.log("mailCount", mailCount);
    console.log("contactsCount", contactsCount);
    res.status(200).json({
      message: "success",
      status: 200,
      mailCount: mailCount === "undefined" ? 0 : mailCount,
      contactsCount: contactsCount === "undefined" ? 0 : contactsCount,
      campaignCount: campaignCount === "undefined" ? 0 : campaignCount,
    });
  }
};

module.exports = { counts };
