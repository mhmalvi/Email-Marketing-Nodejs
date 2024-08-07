const { fieldsValidation } = require("../../../config/utils");
const { campaignCounts } = require("../../common/campaignUtils/fetchCampaigns");
const { contactCounts } = require("../../common/contactsUtils/fetch");

const counts = async (req, res) => {
  const { userID } = req.body;
  // console.log("userID", userID);
  const requiredFields = { userID };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const campaignCount = await campaignCounts(userID); ////get campaign count for today
    const contactsCount = await contactCounts(userID); ///get contacts count for today
    // console.log("ccampaignCount", campaignCount);
    res.status(200).json({
      message: "success",
      status: 200,
      campaignCount: campaignCount === "undefined" ? 0 : campaignCount,
      contactsCount: contactsCount === "undefined" ? 0 : contactsCount,
    });
  }
};

module.exports = { counts };
